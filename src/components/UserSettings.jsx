import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    if (data === "password updated") {
      toast.success(data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handlleFormSubmit = (e) => {
    e.preventDefault();
    particulars = { hash: passwordRef.current.value };
    changePassword(props.emailId, particulars);
  };

  return (
    <div className="bg-orange-200 pb-[2000px] text-center">
      <ToastContainer />
      <h1 className="text-7xl text-center py-[50px]">USER SETTINGS</h1>
      <form action="" onSubmit={handlleFormSubmit}>
        <label htmlFor="new-password" className="text-xl font-semibold">
          New Password
        </label>
        <input
          type="text"
          id="new-password"
          className="border rounded-lg"
          ref={passwordRef}
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

export default UserSettings;
