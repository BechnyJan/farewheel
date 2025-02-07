import { useNavigate } from "react-router-dom";
import "./ResultDetail.css";

export default function ResultDetail({ route }) {
  const navigate = useNavigate();
  const handleBuyTicket = () => {
    navigate("/tickets/single-tickets", { state: { line: route.line, price: 30 } });
  };

    console.log(route.duration, +route.duration)


  return (
    // <li className="route-card">
    //   <strong>Linka:</strong> {route.line} <br />
    //   <strong>Čas:</strong> {route.duration} <br />
    //   <strong>Cena:</strong> {route.price} Kč
    // </li>

    <li className="detailed-result-card">
      <div className="result-summary">
        <p>
          <strong>Čas:</strong> {route.duration}
        </p>
        <div className="result-travel-time">
          <p>
            <strong>Odjezd:</strong> {route.departure}
          </p>
          <p>
            <strong>Příjezd:</strong> {route.arrival}
          </p>
        </div>
      </div>
      <div className="line-details">
        <p>
          <strong>Linka:</strong> {route.line}{" "}
          {route.accessibility && <span className="accessible-icon">♿</span>}
        </p>
      </div>
      <div className="result-detail-btn">
        <button className="buy-ticket-btn" onClick={handleBuyTicket}>
        Koupit jízdenku <span>{+route.duration > 20 ? 30 : 20} CZK</span>
      </button>
        </div>
    </li>
  );
}
