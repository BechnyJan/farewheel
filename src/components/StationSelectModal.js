import { useEffect, useState, useRef } from "react";
import { stations } from "./../data";
import BackButton from "./BackButton";
import "./StationSelectModal.css";

export default function StationSelectModal({
  onClose,
  onSelect,
  onExclude,
  modal,
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Filtrujeme stanice na základě dotazu a režimu (onExclude)
  const filteredStations = stations.filter((station) => {
    const matchesQuery = station.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesExclude =
      !onExclude || (onExclude && !onExclude.includes(station.name));
    return matchesQuery && matchesExclude;
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="station-modal-overlay">
      <div className="station-modal">
        <div className="station-top">
          <BackButton
            onPress={onClose}
            title={onExclude ? "Excluded Stations" : "Journey Trip"}
          />
        </div>
        <p className="station-question">
          {onExclude
            ? "Where wouldn't you travel?"
            : "Where would you like to travel?"}
        </p>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter the station"
          className="station-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!onExclude && (
          <div className="station-tabs">
            <button
              onClick={() => {
                setQuery("Hlavní nádraží");
                inputRef.current.focus();
              }}
            >
              Location
            </button>
            <button
              onClick={() => {
                setQuery("Hlavní nádraží");
                inputRef.current.focus();
              }}
            >
              Home
            </button>
            <button>Work</button>
            <button>Tourist</button>
            <button>Saved</button>
          </div>
        )}
        {query && query.length > 0 && (
          <div className="station-results">
            {filteredStations.map((station, index) => (
              <button
                key={index}
                className="result-btn"
                onClick={() => {
                  onSelect(station.name);
                  onClose();
                }}
              >
                {station.name}
              </button>
            ))}
          </div>
        )}
        {filteredStations.length === 0 && query && (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
}
