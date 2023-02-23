import React, { useRef, useState } from "react";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  let particulars = {};

  const signUp = async (details) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/newuser", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(
            //   {
            // email: "amir@gmail.com",
            // hash: "123456789",
            //   }
          details
        ),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("FETCH POST USER SIGN UP FAIL", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    particulars = {
      email: emailRef.current.value,
      hash: passwordRef.current.value,
    };
    signUp(particulars);
  };

  return (
    <div>
      <h1>Sign Up Here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" ref={passwordRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
