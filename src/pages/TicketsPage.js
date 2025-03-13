import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import TicketsList from "../components/TicketsList";
import "./TicketsPage.css";

export default function TicketsPage({ process, setProcessPurchase }) {
  const location = useLocation();
  const [ticketType, setTicketType] = useState(
    sessionStorage.getItem("ticketType") || "single"
  );

  useEffect(() => {
    if (location.state?.passesEntered) {
      setTicketType("pass");
      sessionStorage.setItem("ticketType", "pass");
    } else {
      setTicketType("single");
      sessionStorage.setItem("ticketType", "single");
    }
  }, [location.state]);


  const [showInfo, setShowInfo] = useState(true);

  const tickets = localStorage.getItem("tickets");
  const passes = localStorage.getItem("passes");

  const handlePurchase = () => {
    setProcessPurchase();
  };

  const handleTicketTypeChange = (type) => {
    setTicketType(type);
    sessionStorage.setItem("ticketType", type);
  };

  const btnClassesSingle =
    ticketType === "single"
      ? "tickets-content-btn_active"
      : "tickets-content-btn";
  const btnClassesPass =
    ticketType === "pass"
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
          <NavLink to="/tickets/passes" className="tickets-navigation_link">
            Get Your Pass
          </NavLink>
        </div>

        {showInfo && tickets?.length > 0 && ticketType === "single" && (
          <div className="info-box">
            <span>ℹ️</span>
            <p>
              Tickets are necessary to be activated before the usage. There is a
              protection during that time the ticket is invalid.
            </p>
          </div>
        )}

        {showInfo && passes?.length > 0 && ticketType === "pass" && (
          <div className="info-box">
            <p>
              <strong>ℹ️</strong> The Block of 10 tickets is now available
              digitally in selected apps.
            </p>
          </div>
        )}

        <div className="tickets-list">
          <h1>{ticketType === "single" ? "My Tickets" : "My Passes"}</h1>
          <div className="tickets-content">
            <button
              onClick={() => handleTicketTypeChange("single")}
              className={btnClassesSingle}
            >
              Single ticket status
            </button>
            <button
              onClick={() => handleTicketTypeChange("pass")}
              className={btnClassesPass}
            >
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
