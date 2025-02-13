import React from "react";
import "./TicketControle.css";

function TicketControle() {
  return (
    <section class="ticket-control">
      <h2>Ticket controle</h2>
      <p>
        Ticket inspectors check the validity of tickets both inside vehicles and
        at station platforms.
      </p>
      <div className="controle">
        <p>
          The ticket inspector is required to carry a badge with four-digit and
          a service certification with the same four-digit number.
        </p>
        <div className="control-section">
          <h3>Inspector's Badge</h3>
          <img src="/images/odznak.png" alt="Odznak revizora" />
          <p>
            The badge includes a four-digit identification number and the
            company logo.
          </p>
        </div>
        <div className="control-section">
          <h3>Service certificate</h3>
          <img src="/images/prukaz.png" alt="Průkaz revizora" />
          <p>
            The service certificate contains the inspector's photo, and
            identification number.
          </p>
        </div>
        <p>
          The additional charge for travelling without valid ticket you will be
          charged a fee of 1000 CZK, the fee can be paid by credit, debit card
          or cash. After the payment you will get the receive of the payment.
        </p>
        <div className="control-section">
          <h3>Receipt</h3>
          <img src="/images/potvrzeni.png" alt="Potvrzení o přirážce" />
          <p>
            The receipt includes the amount paid, date of payment, and
            inspector's identification details.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TicketControle;
