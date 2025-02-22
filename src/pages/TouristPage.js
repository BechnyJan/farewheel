import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import {
  mockResults,
  recommendedTickets,
  ticketOptions,
  touristSpots
} from "../data/textData";
import castle from "../icons/prague_cas.png";
import "./TouristPage.css";

function TouristPage() {
  const navigate = useNavigate();
  const currentLocation = "Hlavní nádraží"; // Hardcoded current location for prototype

  const localeTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleNavigate = (destination) => {
    navigate("/route-results", {
      state: {
        from: currentLocation,
        to: destination,
        results: mockResults,
        time: localeTime,
        data: ticketOptions
      },
    });
  };


  const handleTouristTicket = (ticket, index) => {
    
    navigate(`/tickets/details/${ticket.id}${index}`, {
      state: {
        id: ticket.id,
        name: ticket.name,
        price: ticket.price,
        duration: ticket.duration,
        quantity: 1,
        total: ticket.price,
      },
    });
  };

  return (
    <>
      <>
      <Header />
      </>
      <div className="tourist-page">
        <h1>Tourist Spots</h1>
        <div className="tourist-spots-list">
          {touristSpots.map((spot) => (
            <div className="tourist-spot-card">
              <img
                className="tourist-spot-img"
                alt={spot.name}
                src={castle}
                onClick={() => handleNavigate(spot.destination)}
              />
              <div
                key={spot.id}
                className="tourist-spot-info"
                onClick={() => handleNavigate(spot.destination)}
              >
                <h2>{spot.name}</h2>
                <p>Destination: {spot.destination}</p>
              </div>
            </div>
          ))}
        </div>
        {/* tourist-tickets-container */}
        <h2>Recommended Tickets for Tourists</h2>
        <div className="tourist-tickets-container">
          {recommendedTickets.map((ticket, index) => (
            <div key={ticket.id} className="tourist-ticket-card">
              <h3 className="tourist-ticket-header">{ticket.name}</h3>
              <p className="tourist-ticket-price">Price: {ticket.price} CZK</p>
              <p className="tourist-ticket-description">{ticket.description}</p>
              <button
                className="buy-ticket-btn"
                onClick={() => handleTouristTicket(ticket, index)}
              >
                Buy {ticket.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}

export default TouristPage;
