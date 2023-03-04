import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import NewMessage from "./components/NewMessage";
import AdminAccess from "./components/AdminAccess";
import Gallery from "./pages/Gallery";
import Favourites from "./pages/Favourites";
import NewFav from "./pages/NewFav";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [logInStatus, setLogInStatus] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState(""); // paylaod email is stored here
  const [emailId, setEmailId] = useState(); // payload email id is stored here
  const [itemId, setItemId] = useState(); // item id in gallery is stored here

  let particulars = {};

  const logIn = async (details) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      console.log(data);
      setAccessToken(data.access);
      setLogInStatus(true);
      setEmail(data.payload.email);
      setEmailId(data.payload.id);
      console.log("User logged in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    particulars = {
      email: emailRef.current.value,
      hash: passwordRef.current.value,
    };
    logIn(particulars);
  };

  return (
    <div className="App">
      <NavBar email={email} accessToken={accessToken} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              emailRef={emailRef}
              passwordRef={passwordRef}
              handleLoginForm={handleLoginForm}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/newmessage"
          element={<NewMessage email={email} accessToken={accessToken} />}
        />
        <Route
          path="/admin"
          element={<AdminAccess email={email} accessToken={accessToken} />}
        />
        <Route
          path="/gallery"
          element={
            <Gallery itemId={itemId} setItemId={setItemId} emailId={emailId} />
          }
        />
        <Route path="/favourites" element={<Favourites emailId={emailId} />} />
        <Route
          path="/newfav"
          element={<NewFav itemId={itemId} emailId={emailId} />}
        />

        {/* <h1>Existing User? Log in Here</h1>
        <form onSubmit={handleLoginForm}>
          <label htmlFor="logInEmail">Email</label>
          <input type="text" id="logInEmail" ref={emailRef} />
          <label htmlFor="logInPassword">Password</label>
          <input type="text" id="logInPassword" ref={passwordRef} />
          <button type="submit">Submit</button>
        </form> */}
      </Routes>

      {/* <SignUp /> */}
    </div>
  );
}

export default App;
