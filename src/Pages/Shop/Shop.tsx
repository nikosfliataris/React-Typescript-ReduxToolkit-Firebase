import React from "react";
import "./Shop.scss";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { SetCollection } from "./../../Redux/features/Shop/ShopSlice";
import PreviewCollection from "../../Components/PreviewCollection/PreviewCollection";
type Props = {};

function Shop({}: Props) {
  const CollectionItems = useAppSelector(SetCollection);
  console.log(CollectionItems);
  const dispatch = useAppDispatch();

  return (
    <div>
      {CollectionItems?.map((collection) => (
        <PreviewCollection
          key={collection.id}
          items={collection.items}
          title={collection.title}
          routeName={collection.routeName}
          id={collection.id}
        />
      ))}
    </div>
  );
}

export default Shop;
