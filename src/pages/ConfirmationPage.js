import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";
export default function ConfirmationPage({ ticket, onClose }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const saveToStorage = () => {
    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const savedPasses = JSON.parse(localStorage.getItem("passes")) || [];
    if (!state.type) {
      let val = 0;
      let delayTime = 0;
      let newTickets;
      if (state.activated) {
        val = state.duration ? +state.duration * 60 * 1000 : 60;
        delayTime = 60 * 1000;

        newTickets = Array.from({ length: state.quantity }).map((_, i) => ({
          ...state,
          id: `${state.name}-${Date.now()}-${i}`,
          quantity: 1,
          activationTime: Date.now() + delayTime,
          validUntil: Date.now() + val + delayTime,
        }));
      } else {
        newTickets = Array.from({ length: state.quantity }).map((_, i) => ({
          ...state,
          id: `${state.name}-${Date.now()}-${i}`,
          quantity: 1,
          // activationTime: Date.now() + delayTime,
          // validUntil: Date.now() + val + delayTime,
        }));
      }

      const updatedTickets = [...savedTickets, ...newTickets];

      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    } else {
      let val = 0;
      let delayTime = 0;
      let newPasses;
      if (state.activated) {
        val = state.duration ? +state.duration * 60 * 1000 : 60;
        delayTime = 60 * 1000;

        newPasses = Array.from({ length: state.quantity }).map((_, i) => ({
          ...state,
          id: `${state.name}-${Date.now()}-${i}`,
          quantity: 1,
          activationTime: Date.now() + delayTime,
          validUntil: Date.now() + val + delayTime,
        }));
      } else {
        newPasses = Array.from({ length: state.quantity }).map((_, i) => ({
          ...state,
          id: `${state.name}-${Date.now()}-${i}`,
          quantity: 1,
          activationTime: Date.now() + delayTime,
          validUntil: Date.now() + val + delayTime,
        }));
      }

      const updatedTickets = [...savedPasses, ...newPasses];
      localStorage.setItem("passes", JSON.stringify(updatedTickets));
    }
    navigate("/tickets");
  };

  return (
    <div className="confirmation-page">
      {/* <div className="confirmation-modal"> */}

      <h1 className="confirmation">Purchase Confirmation</h1>
      <p>Your payment has been successful:</p>
      <h2>{state.name}</h2>
      {state.quantity > 1 && (
        <p>
          Total Amount of tickets: <strong>{state.quantity}</strong>
        </p>
      )}
      <p>
        Total Price: <strong>{state.total} CZK</strong>
      </p>
      <p>
        {+state.duration > 1
          ? `Valid for: ${state.duration} minutes`
          : `Ticket is for single journey.`}
      </p>
      <button className="confirm-btn" onClick={saveToStorage}>
        Confirm & Save
      </button>
    </div>
  );
}
