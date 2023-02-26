import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  return (
    <header className={styles.navbar}>
      <nav>
        <li>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/newmessage"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            New Message
          </NavLink>
        </li>
      </nav>
      <h4>{props.email}</h4>
    </header>
  );
};

export default NavBar;
