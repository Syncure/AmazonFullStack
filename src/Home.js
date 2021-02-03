import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/HolidayDeals/Desktop/Fuji_TallHero_HolidayDeals_es_US_1x._CB414278668_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="64452221142"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Business Paperback"
            price={50.99}
            rating={5}
            image="https://images-eu.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_B01,204,203,200_.jpg"
          />
          <Product
            id="21554554552"
            title="Samsung LC49RG90SSUXXEN 49' Curved LED Gaming Monitor"
            price={60.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="1234567890"
            title="Amazon Echo (3rd generation) - Smart Speaker with Alexa"
            price={23.99}
            rating={4}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?%24300x400_retinamobilex2%24"
          />
          <Product
            id="6547892444"
            title="AmazonBasics Juego de sábanas de microfibra ligera y supersuave de fácil cuidado con bolsillos profundos de 16 pulgadas"
            price={45.99}
            rating={3}
            image="https://m.media-amazon.com/images/I/71d8LjTe7eL._AC_UL480_FMwebp_QL65_.jpg"
          />
          <Product
            id="6987451266"
            title="AmazonBasics - Papel multiusos para impresora (8.5 x 11.0 in, 8 fundas de 4000 hojas), color blanco"
            price={89.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/818Mbs24W3L._AC_UL480_FMwebp_QL65_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="1234567890"
            title="AmazonBasics Brazo de montaje Negro"
            price={65.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/81vVhNmk8JL._AC_UL480_FMwebp_QL65_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
