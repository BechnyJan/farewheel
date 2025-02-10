import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TicketItem({
  activated,
  name,
  price,
  duration,
  id,
  index,
  onActivate,
  activationTime,
}) {
  // jsem pridat descrease time
  console.log(activationTime);
   const [ticket, setTicket] = useState([]);
  const [verificationCode, setVerificationCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);

   useEffect(() => {
    // Fetch ticket details from localStorage
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const selectedTicket = savedTickets.find((ticket) => ticket.id === id);
    setTicket(selectedTicket);

    if (selectedTicket) {
      // Generate a random verification code
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
      setVerificationCode(randomCode);

      // Set initial remaining time
      if (selectedTicket.validUntil) {
        setRemainingTime(selectedTicket.validUntil - Date.now());
      }
    }
  }, [id]);

  return (
    <Link to={`/ticket/${id}`} key={`${id}-${index}`} className="ticket-item">
      <div className="ticket-info">
        <h2>{name}</h2>
        <p>Price: {price} CZK</p>
        <p>{!duration ? "One way ticket" : `Duration: ${duration} min`}</p>
        {activated ? (
          <div>
            <p className="activated">Activated</p>
            <span>{activationTime}</span>
          </div>
        ) : (
          <button
            className="activate-btn"
            onClick={() => onActivate(`${id}-${index}`)}
          >
            Activate
          </button>
        )}
      </div>
    </Link>
  );
}
