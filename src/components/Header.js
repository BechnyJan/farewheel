import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tourist from "../icons/tourist.svg";
import classes from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
console.log(location.pathname)
  const accountHandler = () => {
    // navigate("/signin");
    navigate("/signin", { state: { page: `${location.pathname}` } });
  };

  const homeHandler = () => {
    navigate("/");
  };
  return (
    <header>
      <h1 onClick={homeHandler}>FareWheel</h1>
      <label onClick={accountHandler} htmlFor="auth">
        <img src={Tourist} id="auth" alt="account" />
      </label>
    </header>
  );
}
