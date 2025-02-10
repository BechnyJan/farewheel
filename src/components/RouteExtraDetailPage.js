import { useLocation, useNavigate } from "react-router-dom";
import "./RouteExtraDetailPage.css";
import BackButton from "./BackButton";

export default function RouteExtraDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { route } = location.state;

  return (
    <div className="route-detail-container">
      <BackButton title={`Detail linky: ${route.route_short_name}`} />
      <p>
        <strong>Název linky:</strong> {route.route_long_name}
      </p>
      <p>
        <strong>URL:</strong>{" "}
        <a href={route.route_url} target="_blank" rel="noopener noreferrer">
          {route.route_url}
        </a>
      </p>
      <p>
        <strong>Barva:</strong>{" "}
        <span style={{ color: route.route_color }}>{route.route_color}</span>
      </p>
      <p>
        <strong>Frekvence:</strong> {route.frequency}
      </p>
    </div>
  );
}
