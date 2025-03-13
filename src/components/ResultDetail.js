import { useNavigate } from "react-router-dom";
import "./ResultDetail.css";

export default function ResultDetail({ route, from, to, data, index, time }) {
  const navigate = useNavigate();

  const handleBuyTicket = (e) => {
    const buttonText = e.target.innerText;
    const extractedPrice = parseInt(buttonText.match(/\d+/)[0], 10);

    let indexData = 0;
    if (data) {
      for (let i = 0; i < data?.length; i++) {
        if (+data[i].price === extractedPrice) {
          indexData = i;
        }
      }
    }
    const ticket = data[indexData];

    if (ticket) {
      navigate(`/tickets/details/${ticket.id}`, {
        state: {
          id: ticket.id,
          name: ticket.name,
          price: ticket.price,
          duration: ticket.duration,
          quantity: 1,
          total: ticket.price,
        },
      });
    } else {
      console.error("No matching ticket found for price:", extractedPrice);
    }
    const val = +route.duration > 20 ? 30 : 20;
  };

  const calculateArrivalTime = (departureTime, duration) => {
    let departure;

    if (!departureTime) {
      departure = new Date();
    } else {
      const [hours, minutes] = departureTime?.split(":").map(Number);

      departure = new Date();
      departure.setHours(hours);
      departure.setMinutes(minutes);
      departure.setSeconds(0);
    }

    departure.setMinutes(+departure.getMinutes() + +duration);

    return departure.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const noEnteredTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <li className="detailed-result-card">
      <div className="result-summary">
        <p>
          <strong>Time of ride:</strong> {route.duration} min
        </p>
        <div className="result-travel-time">
          <p>
            <strong>Departure:</strong> {from}
          </p>
          <p>
            <strong>Arrival:</strong> {to}
          </p>
          <p>
            <strong>Departure Time:</strong>
            {time ? time : noEnteredTime}
          </p>
          <p>
            <strong>Arrival Time:</strong>
            {calculateArrivalTime(time || noEnteredTime, route.duration)}
          </p>
        </div>
      </div>
      <div className="line-details">
        <p>
          <strong>Line:</strong> {route.line}
          {route.accessibility && <span className="accessible-icon">♿</span>}
        </p>
      </div>
      <div className="result-detail-btn">
        <button
          className="buy-ticket-btn"
          onClick={(e) => {
            handleBuyTicket(e);
          }}
        >
          Buy ticket <span>{+route.duration > 20 ? 30 : 20} CZK</span>
        </button>
      </div>
    </li>
  );
}
