import { NavLink } from "react-router-dom";
import search from "../icons/search.svg";
import "./BottomNavBar.css";
import ticket from "../icons/ticket.svg";
import extras from "../icons/extras.svg";
import tourist from "../icons/tourist.svg";
import more from "../icons/more.svg";

function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <img src={search} alt="Search" /> Search
      </NavLink>
      <NavLink to="/tickets" className="nav-item">
       <img src={ticket} alt="Search" /> Ticket
      </NavLink>
      <NavLink to="/tourist" className="nav-item">
        <img src={tourist} alt="📸" /> Tourist
      </NavLink>
      <NavLink to="/extras" className="nav-item">
       <img src={extras} alt="Search" /> Extras
      </NavLink>
      <NavLink to="/more" className="nav-item">
       <img src={more} alt="Search" />  More
      </NavLink>
    </nav>
  );
}

export default BottomNavBar;
