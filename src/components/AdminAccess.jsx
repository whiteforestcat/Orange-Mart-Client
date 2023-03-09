import React, { useEffect, useState } from "react";

const AdminAccess = (props) => {
  const [allUsers, setAllUsers] = useState();
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
    setAllUsers(data);
  };

  const handleClick = () => {
    particulars = {
      email: props.email,
    };
    adminAccess(particulars);
  };

  useEffect(() => {
    adminAccess({email: props.email});
  }, []);

  return (
    <div className="bg-orange-200 pb-[2000px] text-center">
      <h1 className="text-7xl text-center py-[50px]">ADMIN PAGE</h1>
      {/* <button onClick={handleClick}>View All Existing Accounts</button> */}
      {allUsers && (
        <table className="table-auto mx-auto my-[100px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xl font-bold text-left text-gray-500 uppercase ">
                id
              </th>
              <th className="px-6 py-3 text-xl font-bold text-left text-gray-500 uppercase ">
                email
              </th>
              <th className="px-6 py-3 text-xl font-bold text-left text-gray-500 uppercase ">
                admin status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-xl font-medium text-gray-800 whitespace-nowrap bg-orange-600">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 text-xl font-medium text-gray-800 whitespace-nowrap bg-orange-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-xl font-medium text-gray-800 whitespace-nowrap bg-orange-600">
                    {JSON.stringify(user.admin)}
                  </td>
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
