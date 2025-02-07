import React from "react";
import "./TicketControle.css";

function TicketControle() {
  return (
    <section class="ticket-control">
      <h2>Ticket controle</h2>
      <p>Revizoři kontrolují platnost jízdenek ve vozech i na nástupištích.</p>
      <div className="controle">
        <p>
          Ticket controller is obliged to carry the badge with 4 digits and the
          service certification with the same 4 digits.
        </p>
        <div className="control-section">
          <h3>Odznak revizora</h3>
          <img src="/images/odznak.png" alt="Odznak revizora" />
          <p>Odznak obsahuje 4místné číslo a logo společnosti...</p>
        </div>
        <div className="control-section">
          <h3>Service certificate</h3>
          <img src="/images/prukaz.png" alt="Průkaz revizora" />
          <p>Průkaz obsahuje fotografii, jméno, číslo průkazu...</p>
        </div>
        <p>
          The additional charge for travelling without valid ticket is in the
          height of 1000 CZK, the charge is paied by credit, debit card or cash
          after the payment you will get the receive of the payment.
        </p>
        <div className="control-section">
          <h3>Receipt</h3>
          <img src="/images/potvrzeni.png" alt="Potvrzení o přirážce" />
          <p>Potvrzení obsahuje částku, datum, a identifikaci kontrolora...</p>
        </div>
      </div>
    </section>
  );
}

export default TicketControle;
