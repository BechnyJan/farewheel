import React from "react";
import { useLocation } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import SearchBar from "../components/Searchbar";

function HomePage() {
  const location = useLocation();
  console.log(location)

  return (
    <>
      <Header />
      <div className="homepage">
        <h1>Search for connection</h1>
        <SearchBar />
        <BottomNavBar />
      </div>
    </>
  );
}

export default HomePage;
