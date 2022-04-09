import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "./../../Assets/Logo.svg";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { auth } from "../Firebase/firebase";
import { SignInUser, signOutUser } from "../../Redux/features/User/UserSlice";
import CartDropdown from "../CartDropdown/CartDropdown";
import CartComponent from "../CartComponent/CartComponent";
import { Hidden } from "../../Redux/features/Cart/CartSlice";
type Props = {};

function Header({}: Props) {
  const User = useAppSelector(SignInUser);
  const hidden = useAppSelector(Hidden);
  const dispatch = useAppDispatch();
  const handleSignOut = (e: React.SyntheticEvent) => {
    auth.signOut();
    dispatch(signOutUser(null));
  };
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          Shop
        </Link>
        <Link to="/contact" className="option">
          Contact Us
        </Link>
        {!User ? (
          <Link to="/signin" className="option">
            Sign In
          </Link>
        ) : (
          <Link to="/" className="option">
            <a onClick={handleSignOut}>Sign Out</a>
            <p>{User.displayName}</p>
          </Link>
        )}

        <CartComponent />
      </div>
      {hidden === true ? null : <CartDropdown />}
    </div>
  );
}

export default Header;
