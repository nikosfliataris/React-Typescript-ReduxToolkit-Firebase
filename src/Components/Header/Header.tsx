import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "./../../Assets/Logo.svg";
type Props = {};

function Header({}: Props) {
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
        {/* {
      <Link to={!CurrentUser && "/signin"} className="option">
        <a onClick={handleSignOut}>
          {!CurrentUser ? "Sign In" : "Sign Out"}
        </a>
      </Link>
    } */}
        <Link to="/signin" className="option">
          Sign In
        </Link>
        {/* <CartComponent /> */}
      </div>
      {/* {Currenthidden.hidden === true ? null : <CartDropdown />} */}
    </div>
  );
}

export default Header;
