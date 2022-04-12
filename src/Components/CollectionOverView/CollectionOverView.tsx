import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../Redux/app/hooks";
import { SetCollection } from "../../Redux/features/Shop/ShopSlice";
import CollectionItem from "../CollectionItem/CollectionItem";
import "./CollectionOverView.scss";

function CollectionOverView() {
  const { collectionId } = useParams();
  const ItemsCollections = useAppSelector(SetCollection);
  const filter = ItemsCollections.filter(
    (collection: any) =>
      collection.routeName.toLowerCase() === collectionId?.toLowerCase()
  );
  console.log(filter);

  return (
    <div className="collection-overview">
      <div className="title">{filter[0]?.title.toUpperCase()}</div>
      <div className="collection">
        {filter[0]?.items.map((item) => (
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

export default CollectionOverView;
