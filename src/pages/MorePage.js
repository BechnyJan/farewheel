import BottomNavBar from "../components/BottomNavBar";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MorePage.css";

export default function MorePage({ isSignedIn, setIsSignedIn }) {
  const navigate = useNavigate();
  // const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in status

  const menuItems = [
    { title: "Settings", icon: "⚙️", path: "/settings" },
    { title: "Support", icon: "❓", path: "/support" },
    { title: "About", icon: "ℹ️", path: "/about" },
    { title: "Terms & Conditions", icon: "📜", path: "/terms" },
    { title: "Privacy Policy", icon: "🔒", path: "/privacy" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignUp = () => {
    // Mock sign-up logic
    // setIsSignedIn(true);
    // alert("You have signed up!");

    navigate("/signin");
  };

  const handleSignOut = () => {
    // Mock sign-out logic
    setIsSignedIn();
    alert("You have signed out!");
  };

  return (
    <>
      <div className="more-page">
        <h1 className="more-title">More</h1>
        <div className="account-section">
          <h2>Account</h2>
          {isSignedIn ? (
            <div className="account-actions">
              <p>Welcome, User!</p>
              <div className="account-btn_cotainer">
                <button className="account-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="account-actions">
              <p>You are not signed in.</p>
              <div className="account-btn_cotainer">
                <button className="account-btn" onClick={handleSignUp}>
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
        <ul className="more-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="more-menu-item"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <BottomNavBar />
    </>
  );
}
