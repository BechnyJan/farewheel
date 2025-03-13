import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import ResultDetail from "./ResultDetail";
import "./RouteResultPage.css";

export default function RouteResultPage() {
  const location = useLocation();
  const { from, to, results,   data, time } = location.state || {};
  useEffect(() => {}, [location.state, results]);

  const stations = { from: from, to: to, page: location?.state.page };

  return (
    <div className="route-results-modal">
      <BackButton title={"Connection"} state={stations} />
      <p className="route-results-description">
        {from} → {to}
      </p>
      <div className="results-list">
        {results ? (
          results.map((route, index) => (
            <ResultDetail
              key={index}
              index={index}
              data={data}
              route={route}
              time={time}
              from={from}
              to={to}
            />
          ))
        ) : (
          <p>Žádné dostupné spojení.</p>
        )}
      </div>
    </div>
  );
}
