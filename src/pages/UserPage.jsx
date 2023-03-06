import React from 'react';
import styles from "../components/Navbar.module.css";
import { NavLink } from 'react-router-dom';

const UserPage = (props) => {
    return (
      <div>
        <header className={styles.navbar}>
          <nav>
            <li>
              <NavLink
                to="/"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Gallery
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
                to="/favourites"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Favourites
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shipment"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Shipment
              </NavLink>
            </li>
          </nav>
          <h4>{props.email}</h4>
        </header>
      </div>
    );
};

export default UserPage;