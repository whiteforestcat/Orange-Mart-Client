import React, { useState } from "react";

const NewFav = (props) => {
  const [favourites, setFavourites] = useState();

  const getFavourites = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/allfavourites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: props.emailId }),
      });
      const data = await res.json();
      console.log(data);
      setFavourites(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToFavourites = async (details) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/addtofavourites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = res.json();
      console.log(data);
    } catch (error) {
      console.log("POST FETCH ADD TO USER FAVOURITES FAIL", error.message);
    }
  };

  return (
    <div>
      <h2>NEW FAV</h2>
      <h3>email id: {props.emailId}</h3>
      <h3>item id: {props.itemId}</h3>
      <div>
        <button onClick={() => getFavourites()}>All Favourites</button>
        {favourites && favourites.map((item, index) => {
            return (
                <div key={index}>{item.favs_item}</div>
            )
        })}
      </div>
    </div>
  );
};

export default NewFav;
