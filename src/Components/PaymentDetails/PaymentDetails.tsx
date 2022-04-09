import React, { useState } from "react";
import "./PaymentDetails.scss";
import Form from "./../FormInput/FormInput";
import Button from "./../FormButton/FormButton";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { SignInUser } from "../../Redux/features/User/UserSlice";
import instance from "./../../Axios";
import { AddItem } from "../../Redux/features/Cart/CartSlice";
import CartItemComponent from "../CartItemComponent/CartItemComponent";
import { setOrders } from "../../Redux/features/Orders/OrderSlice";
type Props = {};
type ClientSecret = {
  clientSecret: string;
  data: string;
};
function PaymentDetails({}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const cart = useAppSelector(AddItem);
  console.log(clientSecret);

  const date = new Date();
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const User = useAppSelector(SignInUser);
  const Total_Price = useAppSelector((state) =>
    state.Cart.cart.reduce(
      (accumelatedPrice, cartItem) =>
        accumelatedPrice + cartItem.quantity * cartItem.price,
      0
    )
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    instance
      .post("/payment/create", {
        ammount: Total_Price * 100,
        fullname,
        address,
        email,
      })
      .then(({ data: clientSecret }) => {
        if (cardElement) {
          stripe
            ?.createPaymentMethod({
              type: "card",
              card: cardElement,
            })
            .then(({ paymentMethod }) => {
              stripe
                .confirmCardPayment(clientSecret, {
                  payment_method: paymentMethod?.id,
                })
                .then(({ paymentIntent }) => {
                  const configOrder = {
                    orderTotal: Total_Price,
                    orderItems: cart.map((item) => {
                      return (
                        item.imageUrl,
                        item.name,
                        item.price,
                        item.quantity,
                        item.id,
                        item.id
                      );
                    }),
                  };
                  dispatch(setOrders(configOrder));
                });
            });
        }
      });
  };
  return (
    <div className="paymentdetails">
      <form className="payment-form" onSubmit={handleSubmit}>
        <Form
          name="First Name/Last Name"
          type="text"
          label="First Name/Last Name"
          value={User ? User.displayName : fullname}
          handleChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setFullname(target.value);
          }}
          required
          otherProps={[]}
        />
        <Form
          name="email"
          type="email"
          label="Email"
          value={User ? User.email : email}
          handleChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setEmail(target.value);
          }}
          required
          otherProps={[]}
        />
        <Form
          name="Shipping Address"
          type="text"
          label="Shipping Address"
          value={User ? User.address : address}
          handleChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setAddress(target.value);
          }}
          required
          otherProps={[]}
        />
        <Form
          name="Total"
          type="text"
          label="Total Price"
          value={`${Total_Price}$`}
          handleChange={(e: React.SyntheticEvent) => {}}
          required
          otherProps={[]}
        />
        <CardElement className="card" />
        <Button
          type={"submit"}
          isGoogleSignIn={false}
          inverted={false}
          otherprops={[]}
        >
          Payment
        </Button>
      </form>
      <div className="test-warning">
        *Please use the following test credit card for payments
        <br />
        4242-4242-4242-4242 Exp:{date.getMonth() + 1}/22 - CVC:123
      </div>
    </div>
  );
}

export default PaymentDetails;
