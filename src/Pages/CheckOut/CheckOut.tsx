import React from "react";
import { useNavigate } from "react-router-dom";
import CartItemComponent from "../../Components/CartItemComponent/CartItemComponent";
import { useAppSelector } from "../../Redux/app/hooks";
import Button from "./../../Components/FormButton/FormButton";
import "./CheckOut.scss";
type Props = {};

function CheckOut({}: Props) {
  const Items = useAppSelector((state) => state.Cart.cart);
  console.log(Items);
  const history = useNavigate();
  const Total_Price = useAppSelector((state) =>
    state.Cart.cart.reduce(
      (accumelatedPrice, cartItem) =>
        accumelatedPrice + cartItem.quantity * cartItem.price,
      0
    )
  );
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    history("/payment");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Image</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>{" "}
      {Items.map((item) => (
        <CartItemComponent
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          id={item.id}
          key={item.id}
        />
      ))}
      <div className="total">Total price: {Total_Price}$</div>
      <Button
        onClick={handleClick}
        isGoogleSignIn={false}
        inverted={false}
        otherprops={[]}
        type={"submit"}
      >
        Pay Now
      </Button>
    </div>
  );
}

export default CheckOut;
