import React, { useState, useEffect } from "react";
import NewFav from "./Favourites";

const Gallery = (props) => {
  const [allItems, setAllItems] = useState();

  const fetchDisplayIems = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/allitems");
    const data = await res.json();
    setAllItems(data);
    console.log(data);
  };

  useEffect(() => {
    fetchDisplayIems();
  }, []);

  // if (allItems) {
  //     allItems.map((item) => {
  //       return console.log(item)
  //     });
  // }

  //   const addToFav = async () => {
  //     const res = await fetch("http://127.0.0.1:5000/api/addtofavourites", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON
  //         .stringify
  //         ///////////////// BODY ///////////////////////////
  //         (),
  //     });
  //     const data = await res.json();
  //     setAllItems(data);
  //     console.log(data);
  //   };

  const addToFavourites = async (id) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/addtofavourites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ emailId: props.emailId, itemId: id }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("POST FETCH ADD TO USER FAVOURITES FAIL", error.message);
    }
  };

  const addToCart = async (id) => {
    try {
        const res = await fetch("http://127.0.0.1:5000/api/addtocart", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({emailId: props.emailId, itemId: id})
        });
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log("POST FETCH ADD TO USER CART FAIL", error.message);
    }
  };

  return (
    <div>
      <h1>GALLERY</h1>
      {allItems && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>desciption</th>
              <th>price ($)</th>
              <th>tag</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.tag}</td>
                  <td>
                    <button onClick={() => addToFavourites(item.id)}>
                      Add to Favourites
                    </button>
                  </td>
                  <td>
                    <button onClick={() => addToCart(item.id)}>Add to cart</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* {allItems &&
        allItems.map((item) => {
          return <div></div>;
        })} */}
      {/* {<NewFav itemId={itemId}/>} */}
    </div>
  );
};

export default Gallery;
