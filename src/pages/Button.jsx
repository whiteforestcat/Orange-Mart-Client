import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button
        className={`btn ${styles.button} ${props.className}`}   // just like in vanilla JS, you can have multiple classes for styling, styles.button is from line 2
        type={props.type || "button"}
        onClick={props.onClick}
      >
        {props.children}
        {/* // props.children is very useful in naming buttons, so you dont have to create a separate prop for this */}
      </button>
    </div>
  );
};

export default Button;
