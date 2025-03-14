import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import "./RouteExtraDetailPage.css";

export default function RouteExtraDetailPage() {
  const location = useLocation();
  const { route } = location.state;

  return (
    <>
      <BackButton title={`Detail linky: ${route.route_short_name}`} />
      <div className="route-detail-container">
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
      <div className="route-direction_container">
        <div className="route-direction_item">
          <h2>{`${route.direction[0]} -> ${
            route.direction[route.direction.length - 1]
          }`}</h2>
          <ul>
            {route?.direction.map((station) => (
              <li>{station}</li>
            ))}
          </ul>
        </div>
        <div className="route-direction_item">
          <h2>{`${route.directionReversed[0]} -> ${
            route.directionReversed[route.directionReversed.length - 1]
          }`}</h2>
          <ul>
            {route.directionReversed.map((station) => (
              <li>{station}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
