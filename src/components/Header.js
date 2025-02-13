import React from "react";
import Tourist from "../icons/tourist.svg";
import classes from './Header.module.css'

export default function Header() {
  return (
    <header>
      <h1>FareWheel</h1>
      <img src={Tourist} alt="account" />
    </header>
  );
}
