import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./TicketDetailPage.css";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const selectedTicket = savedTickets.find((ticket) => ticket.id === id);
    setTicket(selectedTicket);

    if (selectedTicket) {
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
      setVerificationCode(randomCode);

      if (selectedTicket.validUntil) {
        setRemainingTime(selectedTicket.validUntil - Date.now());
      }
    }
  }, [id]);

  useEffect(() => {
    if (ticket?.validUntil) {
      const interval = setInterval(() => {
        const timeLeft = ticket.validUntil - Date.now();
        setRemainingTime(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [ticket]);

  const formatTime = (ms) => {
    if (ms <= 0) return "Expired";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  if (!ticket) {
    return <p>Ticket not found</p>;
  }

  return (
    <div className="ticket-detail-page">
      <BackButton title={"Ticket Detail"} />
      <div className="ticket-info">
        <h2>{ticket.name}</h2>
        <p>Price: {ticket.price} CZK</p>
        <p>Duration: {ticket.duration || "One way ticket"}</p>
        <p>Status: {ticket.activated ? "Activated" : "Not Activated"}</p>
        {ticket.activated && remainingTime > 0 ? (
          <p>Remaining: {formatTime(remainingTime)}</p>
        ) : ticket.activated ? (
          <p>Expired</p>
        ) : null}

        <div className="verification-code">
          <p>Verification Code:</p>
          <span>{verificationCode}</span>
        </div>
      </div>
    </div>
  );
}
