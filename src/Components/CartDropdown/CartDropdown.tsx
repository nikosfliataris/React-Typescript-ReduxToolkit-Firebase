import React from "react";
import "./CartDropdown.scss";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { Hidden, togglehidden } from "../../Redux/features/Cart/CartSlice";
import CartItem from "../CartItem/CartItem";
import Button from "./../FormButton/FormButton";
import { RootState } from "../../Redux/app/store";

type Props = {};
type Total_Quantity = {
  accumelatedQuantity: number;
  quantity: number;
};

function CartDropdown({}: Props) {
  const Items = useAppSelector((state: RootState) => state.Cart.cart);
  console.log(Items);

  const hidden = useAppSelector(Hidden);
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const checkOut = (e: React.SyntheticEvent) => {
    e.preventDefault();
    history({ pathname: "/checkout" });
    dispatch(togglehidden(hidden));
  };
  const Total_Quantity = useAppSelector((state) =>
    state.Cart.cart?.reduce(
      (accumelatedQuantity: number, cartItem: { quantity: number }) =>
        accumelatedQuantity + cartItem.quantity,
      0
    )
  );
  const Total_Price = useAppSelector((state) =>
    state.Cart.cart?.reduce(
      (accumelatedPrice, cartItem) =>
        accumelatedPrice + cartItem.quantity * cartItem.price,
      0
    )
  );

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {!Items ? (
          <span className="empty">Your cart is empty</span>
        ) : (
          Items?.map((item) => (
            <CartItem
              id={item.id}
              imageUrl={item.imageUrl}
              price={item.price}
              quantity={item.quantity}
              name={item.name}
            />
          ))
        )}
      </div>
      {!Total_Quantity ? null : <div>Total Quantity: {Total_Quantity}</div>}
      {!Total_Price ? null : <div>Total Price: {Total_Price}$</div>}

      <Button
        onClick={checkOut}
        isGoogleSignIn={false}
        inverted={false}
        otherprops={[]}
        type={"submit"}
      >
        Go to CheckOut
      </Button>
    </div>
  );
}

export default CartDropdown;
