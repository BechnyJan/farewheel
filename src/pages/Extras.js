import { useState } from "react";
import Header from "../components/Header";
import TicketControle from "../components/TicketControle";
import TrafficLines from "../components/TrafficLines";
import routesData from "../data/pid_routes.json";
import BottomNavBar from "./../components/BottomNavBar";
import "./Extras.css"; // Stylování
// console.log(routes.json());

export default function Extras() {
  // {
  const [routes, setRoutes] = useState(routesData);

  const metroRoutes = routes.filter((route) =>
    ["A", "B", "C"].includes(route.route_short_name)
  );

  const tramRoutes = routes.filter((route) => {
    const shortName = route.route_short_name;
    return !isNaN(shortName) && Number(shortName) < 100;
  });

  return (
    <>
      <Header />
      <div className="extras-container">
        <h1>Extras</h1>
        <article className="extras-container">
          <TrafficLines metro={metroRoutes} tram={tramRoutes} />
        </article>
        <article className="extras-container">
          <TicketControle />
        </article>
        <BottomNavBar />
      </div>
    </>
  );
}
