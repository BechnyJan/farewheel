import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./TicketItem.css";

export default function TicketItem({
  activated,
  name,
  price,
  duration,
  id,
  index,
  onActivate,
  validTime,
  activationTime,
}) {
  // jsem pridat descrease time
  // console.log(activationTime, validTime);
  const [ticket, setTicket] = useState([]);
  const [protectionTime, setProtectionTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Fetch ticket details from localStorage
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const selectedTicket = savedTickets.find((ticket) => ticket.id === id);
    setTicket(selectedTicket);

    //   // Set initial remaining time
    //   if (selectedTicket.validUntil) {
    //     setRemainingTime(selectedTicket.validUntil - Date.now());
    //   }
    // }
  }, [id]);

  useEffect(() => {
    if (validTime && activationTime) {
      const checkPendingStatus = activationTime - Date.now();
      setIsPending(checkPendingStatus > 0);

      if (checkPendingStatus > 0) {
        setProtectionTime(60000); // Start at 60s
      } else {
        setRemainingTime(validTime - Date.now());
      }

      const interval = setInterval(() => {
        setProtectionTime((prev) => {
          if (prev > 0) {
            return prev - 1000; // Decrease protection time
          } else {
            setIsPending(false); // Protection is over
            return 0;
          }
        });

        setRemainingTime((prev) => {
          const timeLeft = validTime - Date.now();
          return isPending ? prev : Math.max(timeLeft, 0); // Prevent state reset during pending
        });

        if (validTime - Date.now() <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activationTime, validTime, isPending]);

  const formatTime = (ms) => {
    if (ms <= 0) return "Expired";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const validFormattedTime = validTime
    ? dayjs(validTime).format("HH:mm DD-MM-YYYY")
    : null;

  const activationFormattedTime = activationTime
    ? dayjs(activationTime).format("HH:mm DD-MM-YYYY")
    : null;

  const ticketClass = isPending ? "ticket-pending" : "ticket-active";

  return (
    <Link to={`/ticket/${id}`} key={`${id}-${index}`} className="ticket-item">
      <div className="ticket-info">
        <h2>{name}</h2>
        <p>Price: {price} CZK</p>
        <p>{!duration ? "One way ticket" : `Duration: ${duration} min`}</p>
        {activated ? (
          <div>
            {isPending ? (
              <p className="pending">Pending Activation...</p>
            ) : (
              <p className="activated"></p>
            )}
            <p>Starts at: {activationFormattedTime}</p>
            <p>Valid Until: {validFormattedTime}</p>
            <div className="ticket-activation_desc">
              <p className={ticketClass}>
                {isPending
                  ? formatTime(protectionTime)
                  : formatTime(remainingTime)}
              </p>
            </div>
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
