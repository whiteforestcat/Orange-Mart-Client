import React from "react";

const HomePage = (props) => {
  return (
    <div className="text-center">
      <h1 className="text-7xl text-center py-[50px]">
        Existing User? Log in Here
      </h1>
      <form onSubmit={props.handleLoginForm}>
        <label htmlFor="logInEmail" className="text-xl font-semibold">
          Email
        </label>
        <input
          type="text"
          id="logInEmail"
          ref={props.emailRef}
          className="border rounded-lg"
        />
        <br />
        <div className="my-[10px]"></div>
        <label htmlFor="logInPassword" className="text-xl font-semibold">
          Password
        </label>
        <input
          type="password"
          id="logInPassword"
          ref={props.passwordRef}
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

export default HomePage;
