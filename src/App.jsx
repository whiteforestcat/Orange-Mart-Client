import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [logInStatus, setLogInStatus] = useState(false);
  const [accessToken, setAccessToken] = useState("")
  const [email, setEmail] = useState("")

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
      setAccessToken(data.access)
      setLogInStatus(true);
      setEmail(data.payload.email)
      console.log("User logged in")
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    particulars = {
      email: emailRef.current.value,
      hash: passwordRef.current.value,
    };
    logIn(particulars);
  };

  return (
    <div className="App">
      <NavBar email={email} accessToken={accessToken}/>
      <h1>Existing User? Log in Here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="logInEmail">Email</label>
        <input type="text" id="logInEmail" ref={emailRef} />
        <label htmlFor="logInPassword">Password</label>
        <input type="text" id="logInPassword" ref={passwordRef} />
        <button type="submit">Submit</button>
      </form>

      <SignUp />
    </div>
  );
}

export default App;
