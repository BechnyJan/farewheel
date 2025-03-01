import { useState } from "react";
import { NavLink } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import TicketsList from "../components/TicketsList";
import "./TicketsPage.css";

export default function TicketsPage({ process, setProcessPurchase }) {
  const [ticketType, setTicketType] = useState("single");
  const [showInfo, setShowInfo] = useState(true);

  const tickets = localStorage?.getItem("tickets");
  const passes = localStorage?.getItem("passes");

  // if(!tickets) {
  //   setShowInfo(false)
  // }

  // const handleNavigation = (category) => {
  //   navigate(`/tickets/${category}`);
  // };

  const handlePurchase = () => {
    setProcessPurchase(); // Simulace zakoupení všech dostupných jízdenek
  };

  const ticketOptions = [
    { name: "Single ticket", price: "15", icon: "🚌", duration: "" },
    { name: "30minutes ticket", price: "20", icon: "⏱️", duration: "30" },
    { name: "90minutes ticket", price: "30", icon: "⏳", duration: "90" },
    { name: "Airport shuttle", price: "100", icon: "✈️", duration: "" },
    { name: "Block of 10 tickets", price: "130", icon: "🔟", duration: "" },
  ];

  const contentSingleHandler = () => {
    setTicketType("single");
  };

  const contentPassHandler = () => {
    setTicketType("pass");
  };

  const btnClassesSingle =
    ticketType === "single"
      ? "tickets-content-btn_active"
      : "tickets-content-btn";
  const btnClassesPass =
    ticketType !== "single"
      ? "tickets-content-btn_active"
      : "tickets-content-btn";
  return (
    <>
      <Header />
      <div className="tickets-page">
        <h1>Tickets</h1>
        <div className="tickets-navigation">
          <NavLink to="/tickets/single" className="tickets-navigation_link">
            Get Single Ticket
          </NavLink>
          <NavLink
            to="/tickets/passes"
            id={"pass"}
            className="tickets-navigation_link"
          >
            Get Your Pass
          </NavLink>
        </div>

        {showInfo && tickets?.length > 0 && ticketType === "single" && (
          <div className="info-box">
            <span>ℹ️</span>
            <p>
              Tickets are neccessary to be activated before the usage. There is
              a protection during that time the ticket is invalid.
            </p>
          </div>
        )}

        {showInfo && passes?.length > 0 && ticketType !== "single" && (
          <div className="info-box">
            <p>
              <strong>ℹ️</strong> The Block of 10 tickets is now available
              digitally in selected apps.
            </p>
          </div>
        )}

        {/* udelat zavreni */}
        <div className="tickets-list">
          {ticketType === "single" ? <h1>My Tickets</h1> : <h1>My Passes</h1>}
          <div className="tickets-content">
            <button onClick={contentSingleHandler} className={btnClassesSingle}>
              Single ticket status
            </button>
            <button onClick={contentPassHandler} className={btnClassesPass}>
              Passes Status
            </button>
          </div>
          <TicketsList type={ticketType} />
        </div>
        <div className="purchase-contaner">
          <NavLink
            className="tickets-navigation_link-purchase"
            onClick={handlePurchase}
            to={ticketType === "single" ? "/tickets/single" : "/tickets/passes"}
          >
            Purchase
          </NavLink>
        </div>
        <BottomNavBar />
      </div>
    </>
  );
}
