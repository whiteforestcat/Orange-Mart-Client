import { useRef, useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import NewMessage from "./components/NewMessage";
import AdminAccess from "./components/AdminAccess";
import Gallery from "./pages/Gallery";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import Shipment from "./pages/Shipment";
import UserLogo from "./pages/UserLogo";
import UserSettings from "./components/UserSettings";
import Payment from "./components/Payment";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [logInStatus, setLogInStatus] = useState(false); // to create logout button
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState(""); // paylaod email is stored here
  const [emailId, setEmailId] = useState(); // payload email id is stored here
  const [admin, setAdmin] = useState();
  const [itemId, setItemId] = useState(); // item id in gallery is stored here

  const navigate = useNavigate()

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
      if (accessToken) {
        setLogInStatus(true);
      }
      setEmail(data.payload.email);
      setEmailId(data.payload.id);
      setAdmin(data.adminStatus);
      console.log("User logged in");
      navigate("/", { replace: true });
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
      <NavBar
        email={email}
        accessToken={accessToken}
        logInStatus={logInStatus}
        setLogInStatus={setLogInStatus}
        admin={admin}
      />
      <Routes>
        <Route
          path="/login"
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
          path="/"
          element={
            <Gallery
              itemId={itemId}
              setItemId={setItemId}
              emailId={emailId}
              email={email}
              accessToken={accessToken}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              itemId={itemId}
              emailId={emailId}
              accessToken={accessToken}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart itemId={itemId} emailId={emailId} accessToken={accessToken} />
          }
        />
        <Route
          path="/shipment"
          element={<Shipment emailId={emailId} accessToken={accessToken} />}
        />
        <Route
          path="/userlogo"
          element={
            <UserLogo
              emailRef={emailRef}
              passwordRef={passwordRef}
              handleLoginForm={handleLoginForm}
            />
          }
        />
        <Route
          path="/usersettings"
          element={
            <UserSettings
              emailRef={emailRef}
              passwordRef={passwordRef}
              emailId={emailId}
              accessToken={accessToken}
            />
          }
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {/* <SignUp /> */}
    </div>
  );
}

export default App;
