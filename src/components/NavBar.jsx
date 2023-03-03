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
        <li>
          <NavLink
            to="/admin"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            ADMIN
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            GALLERY
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Favourites
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/newfav"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            NewFav
          </NavLink>
        </li>
      </nav>
      <h4>{props.email}</h4>
    </header>
  );
};

export default NavBar;
