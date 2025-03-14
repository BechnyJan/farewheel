import React from "react";
import BottomNavBar from "../components/BottomNavBar";
import Header from "../components/Header";
import SearchBar from "../components/Searchbar";

function HomePage() {

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
