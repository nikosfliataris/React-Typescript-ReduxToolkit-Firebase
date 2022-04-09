import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import UserReducer from "./../features/User/UserSlice";
import ShopReducer from "../features/Shop/ShopSlice";
import CartReducer from "./../features/Cart/CartSlice";
import OrdersReducer from "./../features/Orders/OrderSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const reducers = combineReducers({
  User: UserReducer,
  Shop: ShopReducer,
  Cart: CartReducer,
  Orders: OrdersReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
