import Fuse from 'fuse.js';
import { useState } from 'react';
import { stations } from '../data';

const options = {
  keys: ['name'],
  threshold: 0.3, // Nastavení míry tolerance chyb
};

const fuse = new Fuse(stations, options);

export function useSearch() {
  const [results, setResults] = useState(stations);

  const searchStations = (query) => {
    if (!query) {
      setResults(stations);
      return;
    }
    const searchResults = fuse.search(query).map((result) => result.item);
    setResults(searchResults);
  };

  return { results, searchStations };
}
