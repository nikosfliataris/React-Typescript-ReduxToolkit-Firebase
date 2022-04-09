import React from "react";
import { useAppDispatch } from "../../Redux/app/hooks";
import {
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/features/Cart/CartSlice";
import "./CartItemComponent.scss";

type Item = {
  imageUrl?: string;
  name?: string;
  price?: number;
  quantity?: number;
  id?: number;
};
function CartItemComponent({ imageUrl, name, price, quantity, id }: Item) {
  const dispatch = useAppDispatch();
  const Deleteitem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteItem({ id, name, price, imageUrl }));
  };

  const increace = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(increaseQuantity({ id, name, price, imageUrl }));
  };
  const decreace = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(decreaseQuantity({ id, name, price, imageUrl }));
  };
  return (
    <>
      <div className="checkout-item" key={id}>
        <div className="image-container">
          <img src={imageUrl} />
        </div>
        <div className="name">{name}</div>
        <div className="price">{price}$</div>
        <div className="quantity">
          <span className="arrow" onClick={decreace}>
            &#10094;
          </span>
          {quantity}
          <span className="arrow" onClick={increace}>
            &#10095;
          </span>
        </div>
        <button className="remove-button" onClick={Deleteitem}>
          X
        </button>
      </div>
    </>
  );
}

export default CartItemComponent;
