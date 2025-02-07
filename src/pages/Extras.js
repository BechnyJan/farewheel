import { useState } from "react";
import TicketControle from "../components/TicketControle";
import TrafficLines from "../components/TrafficLines";
import routesData from "../data/pid_routes.json";
import BottomNavBar from "./../components/BottomNavBar";
import "./Extras.css"; // Stylování
// console.log(routes.json());

export default function Extras() {
  // {
  const [routes, setRoutes] = useState(routesData);

  //   useEffect(() => {
  //     // Načtení dat z JSON souboru
  //     fetch("/data/routes.json")
  //       .then((response) => response.json())
  //       .then((data) => setRoutes(data))
  //       .catch((error) => console.error("Chyba při načítání dat:", error));
  //   }, []);

  //   console.log(routes);

  //   return (
  //     <div className="extras-container">
  //       <h1>Dopravní linky</h1>
  //       <ul className="routes-list">
  //         {routes.map((route) => (
  //           <li
  //             key={route.route_id}
  //             className="route-item"
  //             style={{ backgroundColor: route.route_color }}
  //           >
  //             <a href={route.route_url} target="_blank" rel="noopener noreferrer">
  //               {route.route_short_name} - {route.route_long_name}
  //             </a>
  //             <span className="route-frequency">
  //               Frekvence: {route.frequency}
  //             </span>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }
  //   const [routes, setRoutes] = useState([]);

  const metroRoutes = routes.filter((route) =>
    ["A", "B", "C"].includes(route.route_short_name)
  );

  const tramRoutes = routes.filter((route) => {
    const shortName = route.route_short_name;
    return !isNaN(shortName) && Number(shortName) < 100;
  });

  return (
    <div className="extras-container">
      <h1>Extras</h1>
      <article>
        <TrafficLines metro={metroRoutes} tram={tramRoutes} />
      </article>
      <article>
        <TicketControle />
      </article>
      <BottomNavBar />
    </div>
  );
}
