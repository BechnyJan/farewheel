import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import Settings from "../icons/path2.png";
import Question_Mark from "../icons/g10.png";
import Information from "../icons/g1474.png";
import Terms from "../icons/terms.png";
import Lock from "../icons/lock.png";
import "./MorePage.css";

export default function MorePage({ isSignedIn, setIsSignedIn }) {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  console.log(isSignedIn);

  useEffect(() => {
    let acc = localStorage?.getItem("account");
    if (acc) {
      setAccount(JSON.parse(acc));
    } else {
      setAccount(null);
    }
  }, [setIsSignedIn]);

  const menuItems = [
    { title: "Settings", icon: Settings, path: "/settings" },
    { title: "Support", icon: Question_Mark, path: "/support" },
    { title: "About", icon: Information, path: "/about" },
    { title: "Terms & Conditions", icon: Terms, path: "/terms" },
    { title: "Privacy Policy", icon: Lock, path: "/privacy" },
  ];

  const handleNavigation = (path) => {
    return;
  };

  const handleSignUp = () => {
    navigate("/signin");
  };

  const handleSignOut = () => {
    setIsSignedIn();
    setAccount(null);
    localStorage.removeItem("account");
    navigate("/");
  };

  let emailIn = account?.email;
  return (
    <>
      <div className="more-page">
        <h1 className="more-title">More</h1>
        <div className="account-section">
          <h2>Account</h2>
          {account ? (
            <div className="account-actions">
              <p to="/account">👤 {account?.firstName}</p>
              <p>Welcome, {account?.firstName}!</p>
              <div>
                <p>Email</p>
                <p>{emailIn}</p>
              </div>
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
              <span className="menu-icon">
                <img src={item.icon} alt={item.title} />
              </span>
              <span className="menu-title">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <BottomNavBar />
    </>
  );
}
