import { NavLink } from "react-router-dom";
import search from "../icons/search.svg";
import classes from "./BottomNavBar.module.css";
import ticket from "../icons/ticket.svg";
import extras from "../icons/extras.svg";
import tourist from "../icons/tourist.svg";
import more from "../icons/more.svg";

function BottomNavBar() {

  // dodelat active stay


  return (
      <nav className={classes["bottom-nav"]}>
      <NavLink to="/" className={classes["nav-item"]}>
        <img src={search} alt="Search" /> <h4>Search</h4>
      </NavLink>
      <NavLink to="/tickets" className={classes["nav-item"]}>
        <img src={ticket} alt="Ticket" /> <h4>Ticket</h4>
      </NavLink>
      <NavLink to="/tourist" className={classes["nav-item"]}>
        <img src={tourist} alt="Person" /> <h4>Tourist</h4>
      </NavLink>
      <NavLink to="/extras" className={classes["nav-item"]}>
        <img src={extras} alt="info" /> <h4>Extras</h4>
      </NavLink>
      <NavLink to="/more" className={classes["nav-item"]}>
        <img src={more} alt="Dots" /> <h4>More</h4>
      </NavLink>
    </nav>
  );
}

export default BottomNavBar;
