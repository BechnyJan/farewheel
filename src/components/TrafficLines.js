import React from "react";
import { useNavigate } from "react-router-dom";
import "./TraffiLines.css";

function TrafficLines({ tram, metro }) {
  const navigate = useNavigate();

  const getTramColor = (index) => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A5", "#F3FF33"];
    return colors[index % colors.length]; // Cyklování barev
  };

  const handleRouteClick = (route) => {
    navigate("/extras/route-detail", { state: { route } });
  };
  return (
    <>
      <h2>Dopravní linky</h2>
      <section className="traffic-section">
        <h3 className="traffic-type">Metro</h3>
        <div className="routes-grid">
          {metro.map((route) => (
            <div
              key={route.route_id}
              className="traffic-card"
              style={{ backgroundColor: route.route_color }}
              title={route.route_long_name} // Tooltip pro celý název linky 
              onClick={() => handleRouteClick(route)}
            >
              <span>{route.route_short_name}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="traffic-section">
        <h3 className="traffic-type">Tramvaj</h3>
        <div className="routes-grid">
          {tram.map((route, index) => (
            <div
              key={route.route_id}
              className="traffic-card"
              style={{ backgroundColor: getTramColor(index) }}
              title={route.route_long_name} // Tooltip pro celý název linky
              onClick={() => handleRouteClick(route)}
            >
              <span>{route.route_short_name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default TrafficLines;
