import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import "./PurchaseTicketDetail.css";

export default function PurchaseTicketDetail({}) {
  const location = useLocation();
  const { id, icon, name, price, duration } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [activationType, setActivationType] = useState("manual");
  const navigate = useNavigate();

  const handlePayment = () => {
    // if (
    //   duration === ''
    // ) {
    //     duration = '1'
    // }
    let result = price * quantity;
    console.log(
      "Payment processed for:",
      //   ticket.name,
      name,
      quantity,
      activationType,
      duration,
      result
    );
    navigate(`/confirmation`, {
      state: { id, icon, name, price, duration, quantity, total: result },
    });
  }; // Přesměrování na potvrzovací stránku

  const btn = `Purchase ${quantity > 1 ? "tickets" : "ticket"} (${
    price * quantity
  }
          CZK)`;

  return (
    <div className="purchase-ticket_detail">
      <header className="purchase-header">
        <BackButton title={name} />
        <p>
          {duration}
          {/* {ticket.zone} */}
        </p>
      </header>
      <div className="ticket-info">
        <div className="info-section">
          <label htmlFor="quantity">Number of tickets:</label>
          <input
            className="purchase-input_range"
            type="range"
            id="quantity"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <p>
            {quantity} piece{quantity > 1 ? "s" : ""}
          </p>
        </div>
        <div className="info-section">
          <label>Activation options:</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="activation"
                value="manual"
                checked={activationType === "manual"}
                onChange={(e) => setActivationType(e.target.value)}
              />
              <span>Later manually</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="activation"
                value="immediate"
                checked={activationType === "immediate"}
                onChange={(e) => setActivationType(e.target.value)}
              />
              <span>Activate immediately</span>
            </label>
          </div>
        </div>

        <div className="payment-section">
          <h3>Total: {price * quantity} CZK</h3>
          <button className="buy-btn" onClick={handlePayment}>
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
}
