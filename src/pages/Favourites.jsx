import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { galleryImage } from "../image";

const Favourites = (props) => {
  const [favourites, setFavourites] = useState([]);

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
      setFavourites(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFavourites()
  }, [])

  const deleteFav = async (id) => {
    // console.log(id);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/deletefav", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ emailId: props.emailId, itemId: id }),
      });
      const data = await res.json();
      console.log(data);
      setFavourites(favourites.filter((item) => item.itemid !== id));

      if (data === "favourite item successfully removed") {
        console.log("hello");
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="text-7xl">FAVOURITES</h2>
      <h3>email id: {props.emailId}</h3>
      <h3>item id: {props.itemId}</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {/* <button onClick={() => getFavourites()}>All Favourites</button> */}
          {favourites &&
            favourites.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.favs_item}</td>
                  <td><img src={galleryImage[item.itemid-1]} alt="" /></td>
                  <td>
                    <button onClick={() => deleteFav(item.itemid)}>
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Favourites;
