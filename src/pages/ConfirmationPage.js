import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";
export default function ConfirmationPage({ ticket, onClose }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const saveToStorage = () => {

    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || []; //tady

    // Vytvoříme nové jízdenky na základě množství
    const newTickets = Array.from({ length: state.quantity }).map((_, i) => ({
      ...state,
      id: `${state.name}-${Date.now()}-${i}`, // Unikátní ID
      quantity: 1, 
    }));

    const updatedTickets = [...savedTickets, ...newTickets];

    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    navigate("/tickets");
  };

  return (
    <div className="confirmation-page">
      {/* <div className="confirmation-modal"> */}

      <h1 className="confirmation">Purchase Confirmation</h1>
      <p>Your payment has been successful:</p>
      <h2>{state.name}</h2>
      <p>
        Total Price: <strong>{state.total} CZK</strong>
      </p>
      <p>
        {state.duration
          ? `Valid for: ${state.duration} minutes`
          : `Ticket is for single journey.`}
      </p>
      <button className="confirm-btn" onClick={saveToStorage}>
        Confirm & Save
      </button>
    </div>
  );
}
