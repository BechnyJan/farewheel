import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import TicketsList from "../components/TicketsList";
import "./TicketsPage.css";

export default function TicketsPage({ process, setProcessPurchase }) {
  const [ticketType, setTicketType] = useState("single");
  const navigate = useNavigate();

  const tickets = localStorage.getItem("tickets");

  const handleNavigation = (category) => {
    navigate(`/tickets/${category}`);
  };

  const handlePurchase = () => {
    setProcessPurchase(); // Simulace zakoupení všech dostupných jízdenek
  };

  const ticketOptions = [
    { name: "Single ticket", price: "15", icon: "🚌", duration: "" },
    // { name: "Heritage service single ticket", price: "500 CZK", icon: "🏛️" },
    { name: "30minutes ticket", price: "20", icon: "⏱️", duration: "30" },
    { name: "90minutes ticket", price: "30", icon: "⏳", duration: "90" },
    { name: "Airport shuttle", price: "100", icon: "✈️", duration: "" },
    { name: "Block of 10 tickets", price: "130", icon: "🔟", duration: "" },
  ];

  return (
    <div className="tickets-page">
      <h1>Tickets</h1>
      <div className="tickets-navigation">
        <NavLink to="/tickets/single" className="tickets-navigation_link">
          Single
        </NavLink>
        <NavLink to="/tickets/passes" className="tickets-navigation_link">
          Passes
        </NavLink>
      </div>
      <div className="info-box">
        <span>ℹ️</span>
        <p>
          Those tickets are neccessary to be activated before the usage. There
          is a minute of protection during that time the ticket is invalid.
        </p>
      </div>
      <TicketsList process={process} />
      <NavLink
        className="tickets-navigation_link-purchase"
        onClick={handlePurchase}
        to={"/tickets/single"}
      >
        Purchase
      </NavLink>
      <BottomNavBar />
    </div>
  );
}
