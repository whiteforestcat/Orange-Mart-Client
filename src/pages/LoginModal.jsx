import React from "react";
import styles from "./LoginModal.module.css"; // this is how you import css just for this JSX file
import Button from "./Button";
import ReactDom from "react-dom";


const Overlay = (props) => {


  return (
    <div className={styles.backdrop} onClick={props.okayClicked}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          {/* {console.log(props.allAppointmentsDetails)} */}
          {props.allAppointmentsDetails}

        </div>
        <footer className={styles.actions}>
          <Button onClick={props.okayClicked}>Okay</Button>
        </footer>
      </div>
    </div>
  );
};

// if have mulitple classnames for a tag, need `${class1} ${class2}`
// if only 1 classname, then can just write it as it is ie class1
// remember in both cases, need to enclose in {} to convert to js

const LoginModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Overlay
          title={props.title}
          allAppointmentsDetails={props.allAppointmentsDetails}
          okayClicked={props.okayClicked}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default LoginModal;

// ReactDOM.createPortal() syntax is similar to ReactDOM.render() wheree the first parameter is the component and the second is where you want to store it

// Overlay is a component which is written in this same file. ErrorModal is the parent which pass down props to Overlay