import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./TicketDetailPage.css";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    // Fetch ticket details from localStorage
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const selectedTicket = savedTickets.find((ticket) => ticket.id === id);
    setTicket(selectedTicket);

    // Generate a random verification code
    const randomCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    setVerificationCode(randomCode);
  }, [id]);

  if (!ticket) {
    return <p>Ticket not found</p>;
  }

  return (
    <div className="ticket-detail-page">
      <BackButton title={"Ticket Details"} />
      <div className="ticket-info">
        <h2>{ticket.name}</h2>
        <p>Price: {ticket.price} CZK</p>
        <p>Duration: {ticket.duration || "One way ticket"}</p>
        <p>Status: {ticket.activated ? "Activated" : "Not Activated"}</p>
        <div className="verification-code">
          <p>Verification Code:</p>
          <span>{verificationCode}</span>
        </div>
      </div>
    </div>
  );
}
