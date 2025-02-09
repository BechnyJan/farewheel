import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
import StationSelectModal from "./StationSelectModal";

export default function SearchBar() {
  const navigate = useNavigate();

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [meansOfTransport, setMeansOfTransport] = useState({
    metro: false,
    tram: false,
    accessibleOnly: false,
  });
  const [excludedStations, setExcludedStations] = useState([]);
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

  const handleTransportChange = (e) => {
    const { id, checked } = e.target;
    setMeansOfTransport((prev) => ({ ...prev, [id]: checked }));
  };

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
        means: meansOfTransport,
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
            <div>
              <h2>Extended Filter</h2>
              <div className="filter-transport_types">
                <h3>Select Means of Transport</h3>
                <div className="filter-container">
                  <div className="filter-item_container">
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
            <div
              className="filter-item_container"
              id="filter-container-accessible"
            >
              <label htmlFor="accessibleOnly">Pouze bezbariérové stanice</label>
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
                className="search-input"
              />
            </div>
            {excludedStations.length > 0 && (
              <button onClick={() => setExcludedStations([])}>Reset</button>
            )}
            <div className="filter-section_time">
              <label htmlFor="time">Čas odjezdu:</label>
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
