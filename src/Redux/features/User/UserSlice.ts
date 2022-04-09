import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UserState {
  User: UserProps[];
}
interface UserProps {
  id: string | null;
  displayName: string | null;
  email: string | null;
  address: string | null;
}

const initialState: UserState = {
  User: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.User = action.payload;
    },
    signOutUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { signInUser, signOutUser } = UserSlice.actions;
export const SignInUser = (state: any) => state.User.User;
export const SignOutUser = (state: RootState) => state.User.User;
export default UserSlice.reducer;
