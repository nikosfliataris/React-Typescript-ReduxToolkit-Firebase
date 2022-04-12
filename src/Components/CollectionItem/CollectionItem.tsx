import React from "react";
import "./CollectionItem.scss";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import Button from "./../FormButton/FormButton";
import { useLocation } from "react-router-dom";
import { addItem, AddItem } from "../../Redux/features/Cart/CartSlice";
type ItemProps = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

function CollectionItem({ id, name, price, imageUrl }: ItemProps) {
  const location = useLocation();
  const Item = useAppSelector(AddItem);
  const dispatch = useAppDispatch();
  const AddToCart = (e: React.SyntheticEvent) => {
    dispatch(addItem({ id, name, price, imageUrl, quantity: 1 }));
  };
  return (
    <div className="collection-item" key={id}>
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      {location.pathname === "/shop" ? null : (
        <Button
          inverted
          onClick={AddToCart}
          isGoogleSignIn={false}
          otherprops={[]}
          type={"submit"}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}

export default CollectionItem;
