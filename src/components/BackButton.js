import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import BackBtn from "../icons/backbtn3.png";

export default function BackButton({ title, returnNum = -1, onPress, state }) {
  const navigate = useNavigate();

  const actionHandler = () => {
    if (onPress) {
      onPress();
    }

    if (state?.page === "/tourist") {
      navigate(`${state.page}`, { state });
      return;
    }
    if (state) {
      navigate("/", { state });
    }
    if (!onPress && !state) {
      navigate(returnNum);
    }
  };

  return (
    <div className="back">
      <button className="back-btn" onClick={actionHandler}>
        <img src={BackBtn} alt="" />
      </button>
      {title && <h1 className="header-title">{title}</h1>}
    </div>
  );
}
