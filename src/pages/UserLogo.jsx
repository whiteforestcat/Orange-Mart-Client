import React from "react";
import { NavLink } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "../components/SignUp";

const UserLogo = (props) => {
  const handleClick = {};

  return (
    <div className="bg-orange-200">
      <div className="py-[100px]">
        <HomePage
          emailRef={props.emailRef}
          passwordRef={props.passwordRef}
          handleLoginForm={props.handleLoginForm}
        />
      </div>
      <div className="pt-[100px] pb-[1000px]">
        <SignUp />
      </div>
    </div>
  );
};

export default UserLogo;
