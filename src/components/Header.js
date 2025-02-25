import React from "react";
import { useNavigate } from "react-router-dom";
import Tourist from "../icons/tourist.svg";
import classes from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();

  const accountHandler = () => {
    navigate("/signin");
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
