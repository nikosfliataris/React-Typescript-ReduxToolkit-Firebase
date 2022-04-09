const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KSMf0IpDm3xWv8vUHneuGJYBiet2KEaYuAkafRqr9eTMr16Reci9rRu7qpjhMt5TbNsqhPrBi4AwN1zuEswy8bD007Ep4vyCm"
);

const app = express();
//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
app.get(
  "/",
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
),
  app.post(
    "/payment/create",
    async (
      request: {
        body: {
          ammount: number;
          fullname: string;
          address: string;
          email: string;
        };
      },
      response: {
        status: (arg0: number) => {
          (): any;
          new (): any;
          send: { (arg0: any): void; new (): any };
          json: {
            (arg0: { statusCode: number; message: any }): void;
            new (): any;
          };
        };
      }
    ) => {
      try {
        const { ammount, fullname, address, email } = request.body;
        const paymentIntent = await stripe.paymentIntent.create({
          ammount,
          fullname,
          address,
          email,
          currency: "usd",
        });

        response.status(200).send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (err: any) {
        response.status(404).json({
          statusCode: 404,
          message: err.message,
        });
      }
    }
  );

//API routes

///////////////////////////////////
exports.api = functions.https.onRequest(app);
