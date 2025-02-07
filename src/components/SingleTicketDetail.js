import React from "react";
import ticketArrow from "../icons/ticket_arrow.svg";
import { useNavigate } from "react-router-dom";
import "./SingleTicketDetai.css";

export default function SingleTicketDetail({
  
  icon,
  name,
  price,
  duration,id
}) {
  const navigate = useNavigate();
  // const logged = localStorage.getItem('token')
  console.log(id,icon);
  


  return (
    <>
      <div className="ticket-options" key={id}>
        <div
          // key={inde}
          className="ticket-option"
          onClick={() =>
            navigate(`/tickets/details/${id}`, {
              state: { id, icon, name, price, duration },
            })
          }
        >
          <div className="ticket-icon">{icon}</div>
          <div className="ticket-details">
            <span className="ticket-name">{name}</span>
            <span>{price} CZK</span>
          </div>
          <span className="ticket-arrow">
            <img src={ticketArrow} alt="ticket-navigation_arrow" />
          </span>
        </div>
      </div>
    </>
  );
}
