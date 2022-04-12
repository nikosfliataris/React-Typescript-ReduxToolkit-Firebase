import React from "react";
import "./Payment.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentDetails from "../../Components/PaymentDetails/PaymentDetails";
const stripePromise = loadStripe(
  "PUBLIC_KEY"
);
type Props = {};

function Payment({}: Props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetails />
    </Elements>
  );
}

export default Payment;
