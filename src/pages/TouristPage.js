import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import {
  mockResults,
  recommendedTickets,
  touristSpots
} from "../data/textData";
import "./TouristPage.css";

function TouristPage() {
  const navigate = useNavigate();
  const currentLocation = "Hlavní nádraží"; // Hardcoded current location for prototype

  const handleNavigate = (destination) => {
    navigate("/route-results", {
      state: {
        from: currentLocation,
        to: destination,
        results: mockResults,
        time: new Date().getTime(),
      },
    });
  };

  return (
    <>
      {" "}
      <div className="tourist-page">
        <h1>Tourist Spots</h1>
        <div className="tourist-spots-list">
          {touristSpots.map((spot) => (
            <div
              key={spot.id}
              className="tourist-spot-card"
              onClick={() => handleNavigate(spot.destination)}
            >
              <h2>{spot.name}</h2>
              <p>Destination: {spot.destination}</p>
            </div>
          ))}
        </div>
        {/* tourist-tickets-container */}
        <h2>Recommended Tickets for Tourists</h2>
        <div className="tourist-tickets-container">
          {recommendedTickets.map((ticket) => (
            <div key={ticket.id} className="tourist-ticket-card">
              <h3 className="tourist-ticket-header">{ticket.name}</h3>
              <p className="tourist-ticket-price">Price: {ticket.price} CZK</p>
              <p className="tourist-ticket-description">{ticket.description}</p>
              <button
                className="buy-ticket-btn"
                onClick={() => navigate("/confirmation", { state: ticket })}
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