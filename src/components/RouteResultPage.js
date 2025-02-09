import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultDetail from "./ResultDetail";
import "./RouteResultPage.css";

export default function RouteResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, results,means } = location.state || {};
  console.log(location.state.results,results);
  useEffect(() => {

      
  }, [location.state, results]);
// && results.length > 0

console.log(means);

  return (
    <div className="route-results-modal">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ←
      </button>
      <h1>Spojení</h1>
      <p className="route-results-description">
        {from} → {to}
      </p>
      <div className="results-list">{results  ? (
        results.map((route, index) => (
          <ResultDetail key={index} route={route} />
        ))
      ) : (
        <p>Žádné dostupné spojení.</p>
      )}</div>
    </div>
  );
}
