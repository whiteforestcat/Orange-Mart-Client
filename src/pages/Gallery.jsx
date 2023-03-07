import React, { useState, useEffect, useRef } from "react";
import { galleryImage } from "../image";
import ItemModal from "./ItemModal";

const Gallery = (props) => {
  const [allItems, setAllItems] = useState();
  const [cartQuantity, setCartQuantity] = useState();
  const [popUp, setPopUp] = useState(false);
  // const [popUpData, setPopUpData] = useState()
  const [galleryIndex, setGalleryIndex] = useState();
  const [itemIndex, setItemIndex] = useState();
  // const galleryIndexRef = useRef()

  const handleCartQuantity = (event) => {
    setCartQuantity(event.target.value);
  };

  const fetchDisplayIems = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/allitems");
    const data = await res.json();
    setAllItems(data);
    console.log(data);
  };

  useEffect(() => {
    fetchDisplayIems();
  }, []);

  const enlarge = (id) => {
    setPopUp(true);
    setItemIndex(id);
    setGalleryIndex(id - 1);
    // galleryIndexRef.current = id -1
  };

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
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          emailId: props.emailId,
          itemId: id,
          quantity: cartQuantity,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("POST FETCH ADD TO USER CART FAIL", error.message);
    }
  };

  return (
    <>
      <h1>GALLERY</h1>
      {allItems && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>image</th>
              <th>desciption</th>
              <th>ingredients</th>
              <th>price ($)</th>
              <th>tag</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <img src={galleryImage[index]} alt="" />
                  </td>
                  <td>{item.description}</td>
                  <td>{item.ingredients}</td>
                  <td>{item.price}</td>
                  <td>{item.tag}</td>
                  <td>
                    <button onClick={() => addToFavourites(item.id)}>
                      Add to Favourites
                    </button>
                  </td>
                  <td>
                    <label htmlFor="cart-quantity"></label>
                    <input
                      type="text"
                      id="cart-quantity"
                      value={cartQuantity}
                      onChange={handleCartQuantity}
                    />
                    {/* <button onClick={() => addToCart(item.id)}>
                      Add to cart
                    </button> */}
                    {/* /////////////////////////////// ITEM MODAL ////////////////// */}
                    <button onClick={() => enlarge(item.id)}>
                      Add to cart
                    </button>
                    {/* <ItemModal itemId={item.id} itemName={item.name} itemDescription={item.description} itemIngredients={item.ingredients} itemPrice={item.price} imageIndex={index}/> */}
                    {/* <div
                      className={popUp ? "model open" : "model"}
                      onClick={() => setPopUp(false)}
                    >
                      <p>{item.id}</p>
                      <p>{item.name}</p>
                      <img src={galleryImage[item.id]} alt="" />
                      {item.id}
                      <p>{item.description}</p>
                      <p>{item.ingredients}</p>
                      <p>{item.price}</p>
                      <p>{item.tag}</p>
                    </div> */}
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
      <div
        className={popUp ? "model open" : "model"}
        onClick={() => setPopUp(false)}
      >
        {allItems && (
          <div>
            <img src={galleryImage[galleryIndex]} />
            {galleryIndex !== undefined ? allItems[galleryIndex].name : 1111}
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
