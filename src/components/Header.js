import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tourist from "../icons/tourist.svg";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const accountHandler = () => {
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
