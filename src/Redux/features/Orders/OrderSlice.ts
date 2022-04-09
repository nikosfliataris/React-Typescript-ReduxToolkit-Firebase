import { createSlice } from "@reduxjs/toolkit";

export interface Props {
  Orders: OrdersProps[];
}
interface OrdersProps {
  id: number | any;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  TotalPrice: number;
}

const initialState: Props = {
  Orders: [],
};

const OrderSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.Orders = action.payload;
    },
  },
});

export const { setOrders } = OrderSlice.actions;
export const SetOrders = (state: any) => state.Orders.Orders;
export default OrderSlice.reducer;
