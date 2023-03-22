import React, { useRef } from "react";
import { URL } from "../App";

const NewMessage = (props) => {
  const titleRef = useRef();
  const contentRef = useRef();

  let particulars = {};

  const newMessage = async (details) => {
    try {
      const res = await fetch(`${URL}/api/createmessage`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify(details),
      });
      console.log(details);
      const data = await res.json();
      console.log(data);
      console.log("email:", props.email);
    } catch (error) {
      console.log("FETCH PUT NEW MESSAGE CREATION FAIL", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    particulars = {
      email: props.email,
      title: titleRef.current.value,
      content: contentRef.current.value,
    };
    // console.log(particulars)
    newMessage(particulars);
    console.log("email", props.email);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>New Message</h1>
        <label htmlFor="new-message-title">Title</label>
        <input type="text" id="new-message-title" ref={titleRef} />
        <label htmlFor="new-message-content">Content</label>
        <input type="text" id="new-message-content" ref={contentRef} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewMessage;
