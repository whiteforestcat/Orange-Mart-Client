import React, { useRef } from "react";

const UserSettings = (props) => {
  const passwordRef = useRef();

  let particulars = {};

  const changePassword = async (id, details) => {
    const res = await fetch(`http://127.0.0.1:5000/api/allusers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${props.accessToken}`,
      },
      body: JSON.stringify(details),
    });
    const data = await res.json();
    console.log(data);
  };

  const handlleFormSubmit = (e) => {
    e.preventDefault();
    particulars = { hash: passwordRef.current.value };
    changePassword(props.emailId, particulars);
  };

  return (
    <div>
      <h1>USER SETTINGS</h1>
      <form action="" onSubmit={handlleFormSubmit}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="text"
          id="new-password"
          className="border"
          ref={passwordRef}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserSettings;
