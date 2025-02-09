import React from "react";
import { Link } from "react-router-dom";

export default function TicketItem({activated,name,price, duration,id,index, onActivate}) {
  return (
    <Link to={`/ticket/${id}`}  key={`${id}-${index}`} className="ticket-item">
      <div className="ticket-info">
        <h2>{name}</h2>
        <p>Price: {price} CZK</p>
        <p>
          {!duration
            ? "One way ticket"
            : `Duration: ${duration} min`}{" "}
        </p>
        {activated ? (
          <p className="activated">Activated</p>
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
