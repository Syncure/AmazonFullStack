const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const stripe = require("stripe")(
  "sk_test_51I0a8dEubd8Et6yCk0W7BcxpUbTgQxlhcodCK0q7aDhOWmv8nuqhlzCjaqHlbRvmKnHr2QEaI4dpW8iE0big6kqv00I37h8sL9"
);

//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API ROUTES
app.get("/", (request, response) => response.status(200).send("Hola Mundo"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request BOOM!!! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "PEN",
  });

  //OK - CREATE
  response.status(201).send({
      clientSecret: paymentIntent.client_secret,
  })
});

//Listen command
exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5001/fullstack-4b57b/us-central1/api
