import React, { useEffect, useState } from "react";
import TicketItem from "./TicketItem";
import "./TicketsList.css";
export default function TicketsList({ process }) {
  const [tickets, setTickets] = useState([]);

  console.log(tickets);

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);
  }, []);
  console.log(tickets);
  const handleActivate = (instanceId) => {
    // console.log(instanceId);

    // Aktualizace stavu jízdenky
    // const updatedTickets = tickets.map((ticket) =>
    //   ticket.id === ticketId ? { ...ticket, activated: true } : ticket
    // );
    const updatedTickets = tickets.map((ticket) => {
      // Check if the instance ID matches the current ticket
      if (instanceId.startsWith(ticket.id)) {
        const instanceIndex = instanceId.split("-").pop(); // Get the index from the ID
        if (instanceIndex < ticket.quantity) {
          // Activate the specific instance
          return {
            ...ticket,
            activated: true,
            activationTime: Date.now(),
            validUntil: Date.now() + `${ticket.duration ? ticket.duration * 60*1000 : 60}`,
          };
        }
      }
      return ticket;
    });
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <div className="tickets-list">
      {tickets.length === 0 ? (
        <>
          <h1>My Tickets</h1>
          <p className="tickets-list_information">
            Tickets have not been purchased yet.
          </p>
        </>
      ) : (
        tickets.flatMap((ticket) =>
          Array.from({ length: ticket.quantity }).map((_, index) => (
            <TicketItem
              duration={ticket.duration}
              id={ticket.id}
              name={ticket.name}
              index={index}
              price={ticket.price}
              key={`${ticket.id}-${index}`}
              activated={ticket.activated}
              onActivate={handleActivate}
            />
          ))
        )
      )}
    </div>
  );
}
