import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Searchbar.module.css";
import StationSelectModal from "./StationSelectModal";
import { ticketOptions } from "../data/textData";
import Dropdown from "../icons/drop.png";
import Dropdown2 from "../icons/drop2.png";
import Switch from "../icons/switch.png";

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state ? location?.state?.from : "";
  const to = location?.state ? location?.state?.to : "";

  // const [fromQuery, setFromQuery] = useState(from);
  // const [toQuery, setToQuery] = useState(to);
  const [compoundStations, setCompoundStations] = useState({
    from: "",
    to: "",
  });
  const [meansOfTransport, setMeansOfTransport] = useState({
    metro: true,
    tram: true,
    accessibleOnly: false,
  });
  const [excludedStations, setExcludedStations] = useState([]);
  const [timeHour, setTimeHour] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    setCompoundStations({
      from: location?.state?.from || "",
      to: location?.state?.to || "",
    });
  }, [location.state]);

  const mockResults = [
    {
      id: 1,
      duration: "8",
      departure: "10:33",
      arrival: "10:41",
      line: "Tram 22",
      walkTime: "1",
      accessibility: true,
      from: "Hlavní nádraží",
      to: "Malostranská",
    },
    {
      id: 2,
      duration: "23",
      departure: "10:38",
      arrival: "11:01",
      line: "Tram 9",
      walkTime: "5",
      accessibility: false,
      from: "Hlavní nádraží",
      to: "Malostranská",
    },
    {
      id: 3,
      duration: "15",
      departure: "11:10",
      arrival: "11:25",
      line: "Metro A",
      walkTime: "2",
      accessibility: true,
      from: "Staroměstská",
      to: "Karlův most",
    },
  ];

  const handleTransportChange = (e) => {
    const { id, checked } = e.target;
    setMeansOfTransport((prev) => ({ ...prev, [id]: checked }));
  };

  const filterResults = () => {
    return mockResults.filter((result) => {
      const { metro, tram, accessibleOnly } = meansOfTransport;

      if (!metro && result.line.toLowerCase().includes("metro")) return false;
      if (!tram && result.line.toLowerCase().includes("tram")) return false;
      if (accessibleOnly && !result.accessibility) return false;
      if (
        excludedStations.includes(result.from) ||
        excludedStations.includes(result.to)
      ) {
        return false;
      }
      if (timeHour && result.departure < timeHour) return false;

      return true;
    });
  };

  const handleSearch = () => {
    if (!compoundStations.from || !compoundStations.to) {
      alert("Please select both starting and final destination.");
      return;
    }
    if (compoundStations.from === compoundStations.to) {
      alert("Please select different starting and final destination.");
      return;
    }

    const filteredResults = filterResults();
    console.log(timeHour);

    navigate("/route-results", {
      state: {
        from: compoundStations.from,
        to: compoundStations.to,
        excluded: excludedStations,
        means: meansOfTransport,
        time: timeHour,
        results: filteredResults,
        data: ticketOptions,
      },
    });
  };

  const handleModalSelect = (station) => {
    // if (modalType === "from") setFromQuery(station);
    // if (modalType === "to") setToQuery(station);
    setCompoundStations((prev) => {
      if (modalType === "from") return { ...prev, from: station };
      if (modalType === "to") return { ...prev, to: station };
      return prev;
    });
    if (modalType === "exclude") {
      setExcludedStations((prev) =>
        prev.includes(station) ? prev : [...prev, station]
      );
    }
    setModalType(null);
  };

  const swithStationHandler = () => {
    setCompoundStations((prev) => ({
      from: prev.to,
      to: prev.from,
    }));
  };

  const asyncUpdate = () => {
    // setFromQuery(compoundStations.to);
    // setToQuery(compoundStations.from);
  };

  // console.log(compoundStations, to, from);

  return (
    <div className={classes["search-bar"]}>
      <section>
        <div className={classes["search-container"]}>
          <label>Departure station:</label>
          <input
            type="text"
            value={compoundStations.from}
            readOnly
            onClick={() => setModalType("from")}
            placeholder="Select a departure station.."
            className={classes["search-input"]}
          />
        </div>
        <button
          className={classes["search-switch"]}
          onClick={() => {
            swithStationHandler();
          }}
        >
          <img src={Switch} alt="" />
        </button>
        <div className={classes["search-container"]}>
          <label>Arrival station:</label>
          <input
            type="text"
            value={compoundStations.to}
            readOnly
            onClick={() => setModalType("to")}
            placeholder="Select an arrival station..."
            className={classes["search-input"]}
          />
        </div>
      </section>

      <div className={classes["filter-section"]}>
        <div
          className={
            !showFilters ? classes["filter-toggle"] : classes["filter-active"]
          }
          onClick={() => setShowFilters(!showFilters)}
        >
          <p>{showFilters ? "" : "Filter"} </p>
          {/* <span>{showFilters ? "▲" : "▼"}</span> */}
          <span>
            <img src={!showFilters ? Dropdown : Dropdown2} alt="" />
          </span>
        </div>
        {showFilters && (
          <div className={classes.filters}>
            <div>
              <h2>Extended Filter</h2>
              <div className={classes["filter-transport_types"]}>
                <h3>Selected Means of Transport</h3>
                <div className={classes["filter-container"]}>
                  <div className={classes["filter-item_container"]}>
                    <label htmlFor="metro">Metro</label>
                    <input
                      id="metro"
                      type="checkbox"
                      checked={meansOfTransport.metro}
                      onChange={handleTransportChange}
                    />
                  </div>
                  <div className="filter-item_container">
                    <label htmlFor="tram">Tram</label>

                    <input
                      id="tram"
                      type="checkbox"
                      checked={meansOfTransport.tram}
                      onChange={handleTransportChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes["filter-item_container"]}>
              <label htmlFor="accessibleOnly">Barrier-free entrance</label>
              <input
                id="accessibleOnly"
                type="checkbox"
                checked={meansOfTransport.accessibleOnly}
                onChange={handleTransportChange}
              />
            </div>
            <div>
              <label>Excluded station:</label>
              <input
                type="text"
                value={excludedStations.join(", ")}
                readOnly
                onClick={() => setModalType("exclude")}
                placeholder="Excluded station..."
                className={classes["search-input"]}
              />
            </div>
            {excludedStations.length > 0 && (
              <button onClick={() => setExcludedStations([])}>Reset</button>
            )}
            <div className={classes["filter-section_time"]}>
              <label htmlFor="time">Time Departure:</label>
              <input
                id="time"
                type="time"
                value={timeHour}
                onChange={(e) => setTimeHour(e.target.value)}
                className={classes["search-input"]}
              />
            </div>
          </div>
        )}
      </div>
      {modalType && (
        <StationSelectModal
          onClose={() => setModalType(null)}
          onSelect={handleModalSelect}
          onExclude={modalType === "exclude" ? excludedStations : undefined}
        />
      )}
      <button className={classes["searchbar-btn"]} onClick={handleSearch}>
        Search for connection
      </button>
    </div>
  );
}
