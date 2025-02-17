import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import ResultDetail from "./ResultDetail";
import "./RouteResultPage.css";

export default function RouteResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, results,means, data,time } = location.state || {};
  // console.log(location.state.results,results);
  useEffect(() => {

      
  }, [location.state, results]);

console.log( data, location.state);

  return (
    <div className="route-results-modal">
      <BackButton title={'Connection'} /> 
      <p className="route-results-description">
        {from} → {to}
      </p>
      <div className="results-list">{results  ? (
        results.map((route, index) => (
          <ResultDetail key={index} index={index} data={data}route={route} time={time} from={from} to={to}/>
        ))
      ) : (
        <p>Žádné dostupné spojení.</p>
      )}</div>
    </div>
  );
}
