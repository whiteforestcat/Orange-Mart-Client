import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const NavBar = (props) => {
  return (
    <div className="text-xl">
      <header className="navbar">
        <nav>
          <li>
            <NavLink
              to="/"
              // className={(navData) => (navData.isActive ? active : "")}
            >
              Home
            </NavLink>
          </li>
          {props.email ? (
            false
          ) : (
            <div>
              <li>
                <NavLink
                  to="/userlogo"
                  // className={(navData) =>
                  //   navData.isActive ? active : ""
                  // }
                >
                  <img
                    src="src/assets/images/login-logo.png"
                    width={30}
                    alt=""
                  />
                </NavLink>
              </li>
            </div>
          )}
          {/* {props.email || (
          <div>
            <li>
              <NavLink
                to="/login"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Log In
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
          </div>
        )} */}

          {props.email && (
            <div className="flex">
              {/* <li>
              <NavLink
                to="/newmessage"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                New Message
              </NavLink>
            </li> */}
              {props.admin && (
                <li>
                  <NavLink
                    to="/admin"
                    // className={(navData) =>
                    //   navData.isActive ? active : ""
                    // }
                  >
                    ADMIN
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/favourites"
                  // className={(navData) =>
                  //   navData.isActive ? active : ""
                  // }
                >
                  Favourites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  // className={(navData) =>
                  //   navData.isActive ? active : ""
                  // }
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shipment"
                  // className={(navData) =>
                  //   navData.isActive ? active : ""
                  // }
                >
                  Shipment
                </NavLink>
              </li>
            </div>
          )}
          {props.email && (
            <li>
              <li>
                <NavLink
                  to="/usersettings"
                  // className={(navData) =>
                  //   navData.isActive ? active : ""
                  // }
                >
                  {props.email}
                </NavLink>
              </li>
            </li>
          )}
          {/* {props.email && (
          <li>
            <h4>{props.email}</h4>
          </li>
        )} */}
        </nav>
        {/* <h4>{props.email}</h4> */}
      </header>
    </div>
  );
};

export default NavBar;
