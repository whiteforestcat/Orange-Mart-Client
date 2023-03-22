import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { galleryImage } from "../image";
import { URL } from "../App";

const Shipment = (props) => {
  const [shipment, setShipment] = useState();
  const [userShipment, setUserShipment] = useState();
  // let userShipment;

  const getShipment = async () => {
    try {
      const res = await fetch(`${URL}/api/allshipment`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({ id: props.emailId }),
      });
      const data = await res.json();
      console.log(data);
      setShipment(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getShipment();
  }, []);

  useEffect(() => {
    console.log(shipment);
    console.log(props.email);
    if (shipment) {
      setUserShipment(shipment.filter((item) => item.name === props.email));
      console.log(userShipment);
    }
    // if (shipment) {
    //   userShipment = shipment.filter((item) => item.name === props.email);
    //   console.log(userShipment)
    // }
  }, [shipment]);

  const deleteShipment = async (id) => {
    try {
      const res = await fetch(`${URL}/api/deleteshipment`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({ emailId: props.emailId, cartId: id }),
      });
      const data = await res.json();
      console.log(data);
      setShipment(shipment.filter((item, index) => item.cardid === index));

      if (data === "shipment cancelled") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-orange-200 pb-[2000px]">
      <div className="mx-[100px]"></div>
      <ToastContainer />
      <h2 className="text-7xl text-center py-[50px]">Shipment</h2>
      {userShipment && (
        <div className="grid gap-2 lg:grid-cols-4">
          {userShipment.map((item, index) => (
            <div
              className="w-full rounded-lg shadow-md lg:max-w-sm bg-orange-600"
              key={index}
            >
              <div>
                <img
                  src={galleryImage[item.itemid - 1]}
                  alt=""
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold">
                    {item.cart_item}
                  </h4>
                  <p className="mb-2 leading-normal">{item.description}</p>
                </div>
              </div>
              {/* <div className="px-4 py-2 text-sm text-red-500">
                <button onClick={() => deleteFav(item.itemid)}>DELETE</button>
              </div> */}
            </div>
          ))}
          <button onClick={() => deleteShipment(userShipment[0].cartid)}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export default Shipment;
