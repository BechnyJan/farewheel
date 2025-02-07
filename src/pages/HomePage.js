import React from 'react'
import BottomNavBar from '../components/BottomNavBar'
import SearchBar from '../components/Searchbar'

function HomePage() {
  return (
    <div className="homepage">
      <h1>Vyhledávání spojení</h1>
      <SearchBar />
      <BottomNavBar />
    </div>
  )
}

export default HomePage
