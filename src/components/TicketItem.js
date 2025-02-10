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
  // const [verificationCode, setVerificationCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Fetch ticket details from localStorage
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const selectedTicket = savedTickets.find((ticket) => ticket.id === id);
    setTicket(selectedTicket);

    // if (selectedTicket) {
    //   // Generate a random verification code
    //   const randomCode = Math.random()
    //     .toString(36)
    //     .substring(2, 10)
    //     .toUpperCase();
    //   setVerificationCode(randomCode);

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

      // if (ticket?.validUntil) {
      const interval = setInterval(() => {
        const timeLeft = validTime - Date.now();
        setRemainingTime(timeLeft);
        setIsPending(activationTime > Date.now());
        if (timeLeft <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activationTime, validTime]);

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
              <p className={isPending ? 'ticket-pending' : 'ticket-active'}>{formatTime(remainingTime)}</p>
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
