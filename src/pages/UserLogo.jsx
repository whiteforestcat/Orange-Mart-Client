import React from "react";
import { NavLink } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "../components/SignUp";

const UserLogo = (props) => {
  const handleClick = {};

  return (
    <div>
      <HomePage
        emailRef={props.emailRef}
        passwordRef={props.passwordRef}
        handleLoginForm={props.handleLoginForm}
      />
      <SignUp />
    </div>
  );
};

export default UserLogo;
