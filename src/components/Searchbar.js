import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
import StationSelectModal from "./StationSelectModal";

export default function SearchBar() {
  const navigate = useNavigate();

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [excludedStations, setExcludedStations] = useState([]);
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [timeHour, setTimeHour] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [modalType, setModalType] = useState(null);

  const mockResults = [
    {
      duration: "8",
      departure: "10:33",
      arrival: "10:41",
      line: "Tram 22",
      walkTime: "1",
      accessibility: true,
    },
    {
      duration: "23",
      departure: "10:38",
      arrival: "11:01",
      line: "Bus 119",
      walkTime: "5",
      accessibility: false,
    },
  ];

  const handleSearch = () => {
    if (!fromQuery || !toQuery) {
      console.error("Please select both starting and destination stations.");
      return;
    }
    navigate("/route-results", {
      state: {
        from: fromQuery,
        to: toQuery,
        excluded: excludedStations,
        accessibleOnly,
        time: timeHour,
        results: mockResults,
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
    <div className="search-bar">
      <div className="search-container">
        <label>Nástupní stanice:</label>
        <input
          type="text"
          value={fromQuery}
          readOnly
          onClick={() => setModalType("from")}
          placeholder="Vyberte nástupní stanici..."
          className="search-input"
        />
      </div>

      <div className="search-container">
        <label>Výstupní stanice:</label>
        <input
          type="text"
          value={toQuery}
          readOnly
          onClick={() => setModalType("to")}
          placeholder="Vyberte výstupní stanici..."
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <div
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <p>Extended Filter</p>
          <span>{showFilters ? "▲" : "▼"}</span>
        </div>
        {showFilters && (
          <div className="filters">
            <div><p>Excluded means of transport</p>
              <label>
                Metro
                <input
                  type="checkbox"
                  checked={accessibleOnly}
                  // onChange={(e) => setAccessibleOnly(e.target.checked)}
                />
              </label>
              <label>
                Tram
                <input
                  type="checkbox"
                  checked={accessibleOnly}
                  // onChange={(e) => setAccessibleOnly(e.target.checked)}
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={accessibleOnly}
                  onChange={(e) => setAccessibleOnly(e.target.checked)}
                />
                Pouze bezbariérové stanice
              </label>
            </div>
            <div>
              <label>Vyloučené stanice:</label>
              <input
                type="text"
                value={excludedStations.join(", ")}
                readOnly
                onClick={() => setModalType("exclude")}
                placeholder="Vyberte vyloučené stanice..."
                className="search-input"
              />
            </div>
            {excludedStations.length > 0 && (
              <button onClick={() => setExcludedStations([])}>Reset</button>
            )}
            <div className="filter-section_time">
              <label>Čas odjezdu:</label>
              <input
                id="time"
                type="time"
                value={timeHour}
                onChange={(e) => setTimeHour(e.target.value)}
                className="search-input"
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

      <button className="searchbar-btn" onClick={handleSearch}>
        Hledat spojení
      </button>
    </div>
  );
}
