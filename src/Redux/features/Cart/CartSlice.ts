import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../../app/store";
export interface Props {
  hidden: boolean;
  cart: CartProps[];
}

interface CartProps {
  id: number | any;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  TotalPrice: number;
}

const initialState: Props = {
  hidden: true,
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    togglehidden: (state, action) => {
      state.hidden = !action.payload;
    },
    addItem: (state, action) => {
      const temp = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(temp);

      if (temp >= 0) {
        state.cart[temp].quantity += 1;
        state.cart[temp].TotalPrice =
          state.cart[temp].quantity * state.cart[temp].price;
      } else {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          imageUrl: action.payload.imageUrl,
          quantity: action.payload.quantity,
          TotalPrice: action.payload.quantity * action.payload.price,
        });
      }
    },
    increaseQuantity: (state, action) => {
      const temp = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cart[temp].quantity += 1;
      state.cart[temp].TotalPrice =
        state.cart[temp].quantity * state.cart[temp].price;
    },
    decreaseQuantity: (state, action) => {
      const temp = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart[temp].quantity <= 1) {
        const index = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = index;
      } else {
        state.cart[temp].quantity -= 1;
        state.cart[temp].TotalPrice =
          state.cart[temp].quantity * state.cart[temp].price;
      }
    },
    deleteItem: (state, action) => {
      const index = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = index;
    },
  },
});

export const {
  togglehidden,
  addItem,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} = CartSlice.actions;
export const Hidden = (state: RootState) => state.Cart.hidden;
export const AddItem = (state: RootState) => state.Cart.cart;

export default CartSlice.reducer;
