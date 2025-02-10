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
        <img src={search} alt="Search" /> <h4>Search</h4>
      </NavLink>
      <NavLink to="/tickets" className="nav-item">
        <img src={ticket} alt="Search" /> <h4>Ticket</h4>
      </NavLink>
      <NavLink to="/tourist" className="nav-item">
        <img src={tourist} alt="📸" /> <h4>Tourist</h4>
      </NavLink>
      <NavLink to="/extras" className="nav-item">
        <img src={extras} alt="Search" /> <h4>Extras</h4>
      </NavLink>
      <NavLink to="/more" className="nav-item">
        <img src={more} alt="Search" /> <h4>More</h4>
      </NavLink>
    </nav>
  );
}

export default BottomNavBar;
