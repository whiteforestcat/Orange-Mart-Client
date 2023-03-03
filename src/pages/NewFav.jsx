import React from "react";

const NewFav = (props) => {
  return (
    <div>
      <h2>NEW FAV</h2>
      <h3>email id: {props.emailId}</h3>
      <h3>item id: {props.itemId}</h3>
    </div>
  );
};

export default NewFav;
