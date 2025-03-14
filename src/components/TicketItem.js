import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  onExpire,
}) {
  const [ticket, setTicket] = useState([]);
  const [protectionTime, setProtectionTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const selectedTicket = savedTickets.find((ticket) => ticket.id === id);
    setTicket(selectedTicket);
  }, [id]);

  const detainHandler = () => {
    navigate(`/ticket/${id}`);
  };

  useEffect(() => {
    if (!activationTime || !validTime) return;

    const checkPendingStatus = activationTime - Date.now();
    setIsPending(checkPendingStatus > 0);

    if (checkPendingStatus > 0) {
      setProtectionTime(checkPendingStatus);
    } else {
      setRemainingTime(Math.max(validTime - Date.now(), 0));
    }

    const interval = setInterval(() => {
      setProtectionTime((prev) => Math.max(prev - 1000, 0));

      setRemainingTime((prev) => {
        const timeLeft = validTime - Date.now();
        return isPending ? protectionTime : Math.max(timeLeft, 0);
      });

      if (validTime - Date.now() <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activationTime, validTime, isPending, protectionTime, onExpire]);

  const formatTime = (ms, id, index) => {
    if (ms <= 0) {
      return "Expired";
    }

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((ms % 60000) / 1000);

    if (days > 1) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    if (hours > 1) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }

    return `${minutes}m ${seconds}s`;
  };

  const validFormattedTime = validTime
    ? dayjs(validTime).format("HH:mm DD-MM-YYYY")
    : null;

  const activationFormattedTime = activationTime
    ? dayjs(activationTime).format("HH:mm DD-MM-YYYY")
    : null;

  const formatDuration = (minutes) => {
    if (!minutes) return "One way ticket";
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;

    let formatted = [];
    if (days > 0) formatted.push(`${days}d`);
    if (hours > 0) formatted.push(`${hours}h`);
    if (mins > 0) formatted.push(`${mins}m`);

    return `Duration: ${formatted.join(" ")}`;
  };

  const ticketClass = isPending ? "ticket-pending" : "ticket-active";

  return (
    <div key={`${id}-${index}`} className="ticket-item">
      <div className="ticket-info">
        <h2>{name}</h2>
        <p>Price: {price} CZK</p>
        <p>{formatDuration(duration)}</p>
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
        {activated && (
          <div className="ticket-detail_container">
            <button className="ticket-detail" onClick={detainHandler}>
              Detail
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
