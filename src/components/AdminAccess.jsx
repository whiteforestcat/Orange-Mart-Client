import React from "react";

const AdminAccess = (props) => {
  let particulars = {};

  const adminAccess = async (details) => {
    const res = await fetch("http://127.0.0.1:5000/api/allusers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${props.accessToken}`,
      },
      body: JSON.stringify(details),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleClick = () => {
    particulars = {
      email: props.email,
    };
    adminAccess(particulars);
  };

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <button onClick={handleClick}>View All Existing Accounts</button>
    </div>
  );
};

export default AdminAccess;
