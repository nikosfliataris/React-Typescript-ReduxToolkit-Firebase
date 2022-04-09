import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../CollectionItem/CollectionItem";
import "./PreviewCollection.scss";
type Props = {
  id: number;
  routeName: string;
  title: string;
  items: Item[];
};
type Item = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};
function PreviewCollection({ id, title, routeName, items }: Props) {
  return (
    <div className="collection-preview">
      <h2 className="title" key={id}>
        <Link to={`/shop/${routeName.toLocaleLowerCase()}`}>
          {title.toUpperCase()}......
        </Link>
      </h2>
      <div className="preview">
        {items
          ?.filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
      </div>
    </div>
  );
}

export default PreviewCollection;
