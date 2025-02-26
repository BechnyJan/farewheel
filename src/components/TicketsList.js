import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import "./TicketsList.css";
export default function TicketsList({ type }) {
  const [tickets, setTickets] = useState([]);
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const savedPasses = JSON.parse(localStorage.getItem("passes")) || [];
    setTickets(savedTickets);
    setPasses(savedPasses);
  }, []);

  const handleActivate = (instanceId) => {
    const updatedTickets = tickets.map((ticket) => {
      if (instanceId.startsWith(ticket.id)) {
        const instanceIndex = instanceId.split("-").pop();
        if (instanceIndex < ticket.quantity) {
          const now = Date.now();
          const val = ticket.duration ? +ticket.duration * 60 * 1000 : 60;
          const delayTime = 60 * 1000;

          return {
            ...ticket,
            activated: true,
            activationTime: now + delayTime,
            validUntil: now + val + delayTime,
          };
        }
      }
      return ticket;
    });
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const handlePassActivate = (instanceId) => {
    const updatedPasses = passes.map((pass) => {
      if (instanceId.startsWith(pass.id)) {
        const instanceIndex = instanceId.split("-").pop();
        if (instanceIndex < pass.quantity) {
          const now = Date.now();
          const val = pass.duration ? +pass.duration * 60 * 1000 : 60;
          const delayTime = 60 * 1000;

          return {
            ...pass,
            activated: true,
            activationTime: now + delayTime,
            validUntil: now + val + delayTime,
          };
        }
      }
      return pass;
    });
    setPasses(updatedPasses);
    localStorage.setItem("passes", JSON.stringify(updatedPasses));
  };

  const handleRemoveExpired = (id, type) => {
    if (type) {
      const expiredTicket = tickets.find((ticket) => ticket.id === id);

      if (!expiredTicket) return;

      const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
      setTickets(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      const ticketHistory =
        JSON.parse(localStorage.getItem("ticketHistory")) || [];
      ticketHistory.push({
        ...expiredTicket,
        expiredAt: new Date().toISOString(),
      });
      localStorage.setItem("ticketHistory", JSON.stringify(ticketHistory));
    }
  };

  const classes =
    tickets.length > 4 ? "tickets-container_grid" : "tickets-container";

  return (
    <>
      {type === "single" ? (
        tickets.length === 0 ? (
          <>
            <p className="tickets-list_information">
              Tickets have not been purchased yet.
            </p>
          </>
        ) : (
          <div className={classes}>
            {tickets.flatMap((ticket) =>
              Array.from({ length: ticket.quantity }).map((_, index) => (
                <TicketItem
                  duration={ticket.duration}
                  id={ticket.id}
                  name={ticket.name}
                  index={index}
                  price={ticket.price}
                  key={`${ticket.id}-${index}`}
                  activated={ticket.activated}
                  activationTime={ticket.activationTime}
                  validTime={ticket.validUntil}
                  onActivate={handleActivate}
                  onExpire={() => handleRemoveExpired(ticket.id, "ticket")}
                />
              ))
            )}
          </div>
        )
      ) : passes.length === 0 ? (
        <>
          <p className="tickets-list_information">
            The pass has not been purchased yet. You need to sign in.
          </p>
        </>
      ) : (
        passes.flatMap((ticket) =>
          Array.from({ length: ticket.quantity }).map((_, index) => (
            <TicketItem
              duration={ticket.duration}
              id={ticket.id}
              name={ticket.name}
              index={index}
              price={ticket.price}
              key={`${ticket.id}-${index}`}
              activated={ticket.activated}
              activationTime={ticket.activationTime}
              validTime={ticket.validUntil}
              onActivate={handlePassActivate}
            />
          ))
        )
      )}
    </>
    // </div>
  );
}
