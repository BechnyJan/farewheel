import React, { useEffect, useState } from "react";
import ticketArrow from "../icons/ticket_arrow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "./SingleTicketDetai.css";
import Bus from "../icons/bus.png";

export default function SingleTicketDetail({
  icon,
  name,
  price,
  duration,
  id,
  type,
  onErr,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    const account = localStorage.getItem("account");
    setLogged(account);
  }, []);
  // console.log(id, icon);

  const icons = [Bus, <Bus />, <Bus />, <Bus />, <Bus />];

  const ticketHandler = (e) => {
    console.log(e, type);

    if (type && !logged) {
      onErr();
      return;
    }
    if (!type) {
      navigate(`/tickets/details/${id}`, {
        state: { id, icon, name, price, duration },
      });
    } else {
      navigate(`/tickets/details/${id}`, {
        state: { id, icon, name, price, duration, type },
      });
    }
  };

  console.log(icon);

  return (
    <>
      <div className="ticket-options" key={id}>
        <div
          className="ticket-option"
          onClick={ticketHandler}
        >
          <div className="ticket-icon">
            <img src={icon} alt="" />
          </div>
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
