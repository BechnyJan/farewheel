import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton({
  title,
  setProcessPurchase,
  ticketPage,
  returnNum = -1,
  onPress,
}) {
  const navigate = useNavigate();

  const actionHandler = () => {
    if (ticketPage) {
      console.log("assd", setProcessPurchase);
    }
    if (onPress) {
      onPress();
    }
    if (!onPress) {
      navigate(returnNum);
    }
  };

  return (
    <div className="header">
      <button className="back-btn" onClick={actionHandler}>
        ←
      </button>
      {title && <h1 className="header-title">{title}</h1>}
    </div>
  );
}
