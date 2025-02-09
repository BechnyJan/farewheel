import React from "react";
import { useNavigate } from "react-router-dom";
import './AccountSetting.css'

export default function AccountSetting () {
  const navigate = useNavigate();

  return (
    <div className="account-settings">
      <h2 className="account-title">My Account</h2>
      <ul className="account-options">
        <li className="option-item" onClick={() => navigate("/profile")}>
          <span className="icon">👤</span> Profile
        </li>
        <li className="option-item" onClick={() => navigate("/change-password")}>
          <span className="icon">🔒</span> Change Password
        </li>
        <li className="option-item">
          <span className="icon">🔑</span>
          Identification for purchases over a limit
          <input type="checkbox" className="toggle" />
        </li>
        <li className="option-item" onClick={() => navigate("/social-accounts")}>
          <span className="icon">👥</span> Social Accounts
        </li>
      </ul>
      <button className="logout-btn" onClick={() => navigate("/logout")}>
        <span className="icon">↩️</span> Log Out
      </button>
    </div>
  );
};

