import React, { useState, useEffect, useRef } from "react";
import { galleryImage } from "../image";
import ItemModal from "./ItemModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const res = await fetch("http://127.0.0.1:5000/api/allitems");
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
      const res = await fetch("http://127.0.0.1:5000/api/addtofavourites", {
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
      const res = await fetch("http://127.0.0.1:5000/api/addtocart", {
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
    <>
      <ToastContainer />
      <h1 className="text-7xl">GALLERY</h1>
      {/* ///////////////////// TEST TOAST /////////////////////// */}
      {/* <div>
        <button onClick={showToastMessage}>Notify</button>
        <ToastContainer/>
      </div> */}
      {allItems && (
        <div className="grid gap-2 lg:grid-cols-4">
          {allItems.map((item, index) => (
            <div
              className="w-full rounded-lg shadow-md lg:max-w-sm"
              key={item.id}
            >
              <div onClick={() => enlarge(item.id)}>
                <img
                  src={galleryImage[index]}
                  alt=""
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-blue-600">
                    {item.name}
                  </h4>
                  <p className="mb-2 leading-normal">{item.description}</p>
                  <div className="flex">
                    <p className="mb-2 leading-normal">$ {item.price}</p>
                    <p className="mb-2 leading-normal relative left-[170px]">QTY: {item.stock}</p>
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
                      className="px-4 py-2 text-sm text-red-500 rounded shadow"
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
      {allItems && (
        <div className="flex flex-row">
          {allItems.map((item, index) => {
            return (
              <div key={item.id} className="">
                <Card className="max-w-[24rem] overflow-hidden">
                  <div onClick={() => enlarge(item.id)}>
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none"
                    >
                      <img src={galleryImage[index]} alt="" />
                    </CardHeader>
                    <CardBody>
                      <Typography variant="h4" color="blue-gray">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="lead"
                        color="gray"
                        className="mt-3 font-normal"
                      >
                        {item.description}
                      </Typography>
                    </CardBody>
                  </div>

                  <CardFooter className="flex items-center justify-between">
                    {props.accessToken && (
                      <div className="flex">
                        <button
                          onClick={() => {
                            addToFavourites(item.id);
                            // addToFavMessage();
                          }}
                        >
                          {/* <ToastContainer /> */}
                          Add to Favourites
                        </button>
                        <Typography className="font-normal">
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
                        </Typography>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
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
            {arrayIndex !== undefined ? (
              <div>
                <h1>{allItems[arrayIndex].name}</h1>
                <h1>{allItems[arrayIndex].description}</h1>
                <h1>{allItems[arrayIndex].ingredients}</h1>
              </div>
            ) : (
              11111
            )}
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
