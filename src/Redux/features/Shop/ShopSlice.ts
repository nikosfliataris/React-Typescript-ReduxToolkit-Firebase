import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface CollectionState {
  Collection: ShopState[];
}
interface ShopState {
  id: number;
  routeName: string;
  title: string;
  items: Item[];
}
interface Item {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

const initialState: CollectionState = {
  Collection: [],
};

const ShopSlice = createSlice({
  name: "Collection",
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.Collection = action.payload;
    },
  },
});

export const { setCollection } = ShopSlice.actions;
export const SetCollection = (state: RootState) => state.Shop.Collection;
export default ShopSlice.reducer;
