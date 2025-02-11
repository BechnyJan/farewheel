import { useNavigate } from "react-router-dom";
import "./ResultDetail.css";

export default function ResultDetail({ route, from, to }) {
  const navigate = useNavigate();
  const handleBuyTicket = () => {
    // const navigation = `/tickets/details/${+route.duration > 20 ? 2 : 1}`;
    const navigation = `/tickets/single`;
    const val = +route.duration > 20 ? 30 : 20;
    navigate(navigation, { state: { line: route.line, price: val } });
  };

  return (
    <li className="detailed-result-card">
      <div className="result-summary">
        <p>
          <strong>Čas:</strong> {route.duration}
        </p>
        <div className="result-travel-time">
          <p>
            <strong>Odjezd:</strong> {from}
          </p>
          <p>
            <strong>Příjezd:</strong> {to}
          </p>
        </div>
      </div>
      <div className="line-details">
        <p>
          <strong>Linka:</strong> {route.line}
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
