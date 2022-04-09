import React from "react";
import "./Payment.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentDetails from "../../Components/PaymentDetails/PaymentDetails";
const stripePromise = loadStripe(
  "pk_test_51KSMf0IpDm3xWv8vk61nkEiLHkbYuzIu94wh4cgZo8omfInoMQzbanB63qdw04ISimVHGmFZwcclPcqM0QFkag7Z00ecJy5FAf"
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
