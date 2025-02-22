import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton({
  title,
  setProcessPurchase,
  ticketPage,
  returnNum = -1,
  onPress,
  state
}) {
  const navigate = useNavigate();

  const actionHandler = () => {
    if (ticketPage) {
      console.log("assd", setProcessPurchase);
    }
    if (onPress) {
      onPress();
    }
    if (state) {
      navigate('/', {state});
    }
    if (!onPress && !state) {
      navigate(returnNum);
    }
  };

  console.log(state);
  

  return (
    <div className="back">
      <button className="back-btn" onClick={actionHandler}>
        ←
      </button>
      {title && <h1 className="header-title">{title}</h1>}
    </div>
  );
}
