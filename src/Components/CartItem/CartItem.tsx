import React from "react";
import "./CartItem.scss";
type Props = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
};

function CartItem({ id, imageUrl, name, price, quantity }: Props) {
  return (
    <div className="cart-item" key={id}>
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <div className="price-quantity">
          <span className="quantity">{quantity} X </span>
          <span className="price"> ${price}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
