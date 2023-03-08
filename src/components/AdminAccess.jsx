import React, { useState } from "react";

const AdminAccess = (props) => {
  const [allUsers, setAllUsers] = useState()
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
    setAllUsers(data)
  };

  const handleClick = () => {
    particulars = {
      email: props.email,
    };
    adminAccess(particulars);
  };

  return (
    <div>
      <h1 className="text-7xl">ADMIN PAGE</h1>
      <button onClick={handleClick}>View All Existing Accounts</button>
      {allUsers && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>admin status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{JSON.stringify(user.admin)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAccess;
