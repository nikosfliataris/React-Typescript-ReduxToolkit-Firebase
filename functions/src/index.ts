const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KSMf0IpDm3xWv8vUHneuGJYBiet2KEaYuAkafRqr9eTMr16Reci9rRu7qpjhMt5TbNsqhPrBi4AwN1zuEswy8bD007Ep4vyCm"
);

// App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// API Routes
app.get(
  "/payment",
  (
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (arg0: string): any; new (): any };
      };
    }
  ) => res.status(200).send("hello world")
);

app.post(
  "/payment/create",
  async (
    request: { query: { total: number } },
    response: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (arg0: { clientSecret: string }): void; new (): any };
      };
    }
  ) => {
    const total = request.query.total;
    console.log("payment", total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  }
);

//API routes
exports.api = functions.https.onRequest(app);
