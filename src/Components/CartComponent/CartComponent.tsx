import React from "react";
import { ReactComponent as Icon } from "./../../Assets/CartIcon.svg";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { Hidden, togglehidden } from "../../Redux/features/Cart/CartSlice";
import "./CartComponent.scss";
type Props = {};

function CartComponent({}: Props) {
  const Currenthidden = useAppSelector(Hidden);
  const dispatch = useAppDispatch();
  const handleDropdown = () => {
    dispatch(togglehidden(Currenthidden));
  };
  const TotalPrice = useAppSelector((state) =>
    state.Cart.cart?.reduce(
      (accumelatedPrice, cartItem) =>
        accumelatedPrice + cartItem.quantity * cartItem.price,
      0
    )
  );
  return (
    <div className="cart-icon">
      <i
        className="fas fa-shopping-cart shopping-cart"
        onClick={handleDropdown}
      ></i>

      {TotalPrice ? (
        <span className="item-count-full">{TotalPrice} $</span>
      ) : (
        <span className="item-count-full"></span>
      )}
    </div>
  );
}

export default CartComponent;
