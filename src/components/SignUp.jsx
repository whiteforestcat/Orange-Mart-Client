import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      if (data === "new user created") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
    <div className="text-center">
      <ToastContainer />
      <h1 className="text-7xl text-center py-[50px]">Sign Up Here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-xl font-semibold">
          Email
        </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          className="border rounded-lg"
        />
        <br />
        <div className="my-[10px]"></div>
        <label htmlFor="password" className="text-xl font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          className="border rounded-lg"
        />
        <button
          type="submit"
          className="text-xl font-semibold border rounded-xl px-2 bg-orange-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
