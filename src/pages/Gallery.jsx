import React, { useState, useEffect, useRef } from "react";
import { galleryImage } from "../image";
import ItemModal from "./ItemModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "../App";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

const Gallery = (props) => {
  const [shippedStatus, setShipppedStatus] = useState(false);
  const [allItems, setAllItems] = useState();
  const [cartQuantity, setCartQuantity] = useState();
  const [popUp, setPopUp] = useState(false);
  // const [popUpData, setPopUpData] = useState()
  const [arrayIndex, setArrayIndex] = useState();
  const [itemIndex, setItemIndex] = useState();
  const [counter, setCounter] = useState(0);

  const handleCartQuantity = (event) => {
    setCartQuantity(event.target.value);
  };

  const fetchDisplayIems = async () => {
    const res = await fetch(`${URL}/api/allitems`);
    const data = await res.json();
    console.log(data);
    setAllItems(data);
  };

  useEffect(() => {
    fetchDisplayIems();
    console.log("test");
  }, [counter]);

  const enlarge = (id) => {
    if (props.accessToken) {
      setPopUp(true);
      setItemIndex(id);
      setArrayIndex(id - 1);
      // arrayIndexRef.current = id -1
    }
  };

  const addToFavourites = async (id) => {
    try {
      const res = await fetch(`${URL}/api/addtofavourites`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({
          emailId: props.emailId,
          itemId: id,
          favsId: props.emailId,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data === "item added to favourites") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (data === "item already in favourites") {
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
      const res = await fetch(`${URL}/api/addtocart`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({
          emailId: props.emailId,
          itemId: id,
          quantity: cartQuantity,
          cartId: props.emailId,
        }),
      });
      setCounter(counter + 1);
      const data = await res.json();
      console.log(data);

      if (data === "item added to cart") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (data === "item already in cart") {
        toast.warning(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (data === "please enter quantity") {
        toast.warning(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("GA_CAPSTONE"));
    if (data !== null) {
      setShipppedStatus(data);
    }
    console.log(data);
  }, []);

  useEffect(() => {
    // console.log("shippedStatus", shippedStatus)
    localStorage.setItem("GA_CAPSTONE", JSON.stringify(shippedStatus));
  }, [shippedStatus]);

  return (
    <div className="bg-orange-200">
      <div className="mx-[100px]">
        <ToastContainer />
        <h1 className="text-7xl text-center py-[50px]">GALLERY</h1>
        {/* ///////////////////// TEST TOAST /////////////////////// */}
        {/* <div>
        <button onClick={showToastMessage}>Notify</button>
        <ToastContainer/>
      </div> */}
        {allItems && (
          <div className="grid gap-2 lg:grid-cols-4">
            {allItems.map((item, index) => (
              <div
                className="w-full rounded-lg shadow-md lg:max-w-sm bg-orange-600"
                key={item.id}
              >
                <div onClick={() => enlarge(item.id)}>
                  <img
                    src={galleryImage[index]}
                    alt=""
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <p className="mb-2 leading-normal text-yellow-50">
                      {item.description}
                    </p>
                    <div className="flex">
                      <p className="mb-2 leading-normal text-yellow-50">
                        $ {item.price}
                      </p>
                      <p className="mb-2 leading-normal relative left-[170px] text-yellow-50">
                        QTY: {item.stock}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {props.accessToken && (
                    <div className="flex">
                      <button
                        onClick={() => {
                          addToFavourites(item.id);
                          // addToFavMessage();
                        }}
                        className="px-4 py-2 text-sm text-white rounded shadow border-4 border-orange-700 bg-orange-700"
                      >
                        {/* <ToastContainer /> */}
                        Add to Favourites
                      </button>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={popUp ? "model open" : "model"}>
          {allItems && (
            <div className="bg-orange-200 p-[1000px] ">
              <div className="bg-orange-600 text-center rounded-lg">
                <button onClick={() => setPopUp(false)}>Exit</button>
                <img src={galleryImage[arrayIndex]} />
                {arrayIndex !== undefined ? (
                  <div>
                    <h1 className="text-xl font-semibold">
                      {allItems[arrayIndex].name}
                    </h1>
                    <h1 className="mb-2 leading-normal text-yellow-50">
                      {allItems[arrayIndex].description}
                    </h1>
                    <h1 className="mb-2 leading-normal text-yellow-50">
                      {allItems[arrayIndex].ingredients}
                    </h1>
                  </div>
                ) : (
                  11111
                )}
                <input
                  type="text"
                  id="cart-quantity"
                  value={cartQuantity}
                  onChange={handleCartQuantity}
                  className="border rounded-lg"
                />
                <button
                  onClick={() => addToCart(itemIndex)}
                  className="text-xl font-semibold border rounded-xl px-2 bg-orange-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
