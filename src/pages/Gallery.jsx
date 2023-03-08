import React, { useState, useEffect, useRef } from "react";
import { galleryImage } from "../image";
import ItemModal from "./ItemModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery = (props) => {
  const [allItems, setAllItems] = useState();
  const [cartQuantity, setCartQuantity] = useState();
  const [popUp, setPopUp] = useState(false);
  // const [popUpData, setPopUpData] = useState()
  const [arrayIndex, setArrayIndex] = useState();
  const [itemIndex, setItemIndex] = useState();
  // const arrayIndexRef = useRef()

  const addToFavMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_RIGHT,
    });
    toast.error("Error Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleCartQuantity = (event) => {
    setCartQuantity(event.target.value);
  };

  const fetchDisplayIems = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/allitems");
    const data = await res.json();
    console.log(data);
    setAllItems(data);
  };

  useEffect(() => {
    fetchDisplayIems();
  }, []);

  const enlarge = (id) => {
    setPopUp(true);
    setItemIndex(id);
    setArrayIndex(id - 1);
    // arrayIndexRef.current = id -1
  };

  const addToFavourites = async (id) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/addtofavourites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          emailId: props.emailId,
          itemId: id,
          favsId: props.emailId,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data == "item added to favourites") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (data == "item already in favourites") {
        toast.warning(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
          cartId: props.emailId,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("POST FETCH ADD TO USER CART FAIL", error.message);
    }
  };

  // useEffect(() => {
  //   toast.promise(addToFavourites, {
  //     pending: "Adding to Favourites",
  //     success: "Added to Favourites!",
  //     error: "Error"
  //   });
  // }, [itemIndex]);

  // useEffect(() => {
  //   addToFavMessage()

  // }, [])

  return (
    <>
      <h1 className="text-7xl">GALLERY</h1>
      <ToastContainer />
      {/* ///////////////////// TEST TOAST /////////////////////// */}
      {/* <div>
        <button onClick={showToastMessage}>Notify</button>
        <ToastContainer/>
      </div> */}

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
              <th>stock</th>
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
                  <td>{item.stock}</td>
                  <td>{item.tag}</td>
                  <td>
                    <button
                      onClick={() => {
                        addToFavourites(item.id);
                        // addToFavMessage();
                      }}
                    >
                      {/* <ToastContainer /> */}
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
                      className="border border-black"
                    />
                    <button onClick={() => addToCart(item.id)}>
                      Add to cart
                    </button>
                    {/* /////////////////////////////// ITEM MODAL ////////////////// */}
                    <button onClick={() => enlarge(item.id)}>Pop Up</button>
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
      <div className={popUp ? "model open" : "model"}>
        {allItems && (
          <div>
            <button onClick={() => setPopUp(false)}>Exit</button>
            <img src={galleryImage[arrayIndex]} />
            {arrayIndex !== undefined ? allItems[arrayIndex].name : 11111}
            <input
              type="text"
              id="cart-quantity"
              value={cartQuantity}
              onChange={handleCartQuantity}
              className="border border-black"
            />
            <button onClick={() => addToCart(itemIndex)}>Add to cart</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
