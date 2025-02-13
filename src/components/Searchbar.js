import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Searchbar.module.css";
import StationSelectModal from "./StationSelectModal";
import { ticketOptions } from "../data/textData";

export default function SearchBar() {
  const navigate = useNavigate();

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [meansOfTransport, setMeansOfTransport] = useState({
    metro: true,
    tram: true,
    accessibleOnly: false,
  });
  const [excludedStations, setExcludedStations] = useState([]);
  const [timeHour, setTimeHour] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [modalType, setModalType] = useState(null);

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
  // console.log(classes);

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
  let errText = "";
  let err = <p>{errText}</p>;
  const handleSearch = () => {
    if (fromQuery === toQuery) {
      alert("Please select different starting and final destination.");
      // errText = "Please select both starting and destination stations.";
      return;
    }
    if (!fromQuery || !toQuery) {
      alert("Please select both starting and final destination.");
      // errText = "Please select both starting and destination stations.";
      return;
    }

    // errText = "";
    const filteredResults = filterResults();

    navigate("/route-results", {
      state: {
        from: fromQuery,
        to: toQuery,
        excluded: excludedStations,
        means: meansOfTransport,
        time: timeHour,
        results: filteredResults,
        data: ticketOptions,
      },
    });
  };

  const handleModalSelect = (station) => {
    if (modalType === "from") setFromQuery(station);
    if (modalType === "to") setToQuery(station);
    if (modalType === "exclude") {
      setExcludedStations((prev) =>
        prev.includes(station) ? prev : [...prev, station]
      );
    }
    setModalType(null);
  };

  return (
    <div className={classes["search-bar"]}>
      <div className={classes["search-container"]}>
        <label>Nástupní stanice:</label>
        <input
          type="text"
          value={fromQuery}
          readOnly
          onClick={() => setModalType("from")}
          placeholder="Vyberte nástupní stanici..."
          className={classes["search-input"]}
        />
      </div>

      <div className={classes["search-container"]}>
        <label>Výstupní stanice:</label>
        <input
          type="text"
          value={toQuery}
          readOnly
          onClick={() => setModalType("to")}
          placeholder="Vyberte výstupní stanici..."
          className={classes["search-input"]}
        />
      </div>

      <div className={classes["filter-section"]}>
        <div
          className={
            !showFilters ? classes["filter-toggle"] : classes["filter-active"]
          }
          onClick={() => setShowFilters(!showFilters)}
        >
          <p>Extended Filter</p>
          <span>{showFilters ? "▲" : "▼"}</span>
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
              <label htmlFor="accessibleOnly">Bezbariérový vstup</label>
              <input
                id="accessibleOnly"
                type="checkbox"
                checked={meansOfTransport.accessibleOnly}
                onChange={handleTransportChange}
              />
            </div>
            <div>
              <label>Vyloučené stanice:</label>
              <input
                type="text"
                value={excludedStations.join(", ")}
                readOnly
                onClick={() => setModalType("exclude")}
                placeholder="Vyberte vyloučené stanice..."
                className={classes["search-input"]}
              />
            </div>
            {excludedStations.length > 0 && (
              <button onClick={() => setExcludedStations([])}>Reset</button>
            )}
            <div className={classes["filter-section_time"]}>
              <label htmlFor="time">Čas odjezdu:</label>
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
        Hledat spojení
      </button>
      {/* {err} */}
    </div>
  );
}
