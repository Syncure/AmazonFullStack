import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //Generar un stripe secreto y especial que nos permita cobrar un cliente
    const getClienteSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe espera el total en subunidades de moneda
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClienteSecret();
  }, [basket]);

  console.log("EL SECRETO ES >>>", clientSecret);

  const handleSubmit = async (event) => {
    //Algo elegante de Stripe por aqui :3...

    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentItenT = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    //Recibe los cambios en CardElement
    //y muestra cualquier error mediante el cliente escribe su tarjeta
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Revisar (<Link to="/checkout">{basket.length} items</Link>)
        </h1>

        {/* Payment section - delivery address  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Datos de compra</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Mz A1 lt 33 sector Alfonzo Ugarte</p>
            <p>San Juan de Miraflores, Lima</p>
          </div>
        </div>

        {/* Payment section - review items  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Lista de productos</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - payment method  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Metodo de pago</h3>
          </div>
          <div className="payment__details">
            {/* La magia de stripe aqui */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Pago total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"S/"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>
                    {processing ? <p>Processing</p> : "Comprar Ahora"}
                  </span>
                </button>
              </div>

              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
