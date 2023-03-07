import React, { useState } from "react";

const Shipment = (props) => {
  const [shipment, setShipment] = useState();

  const getShipment = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/allshipment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
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

  const deleteShipment = async (id) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/deleteshipment", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ emailId: props.emailId, cartId: id }),
      });
      const data = await res.json();
      console.log(data);
      setShipment(shipment.filter((item, index) => item.cardid === index))
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-7xl">Shipment</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          <button onClick={() => getShipment()}>All Shipment</button>
          {shipment &&
            shipment.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.cart_item}</td>
                </tr>
              );
            })}
          <td>
            <button onClick={() => deleteShipment(shipment[0].cartid)}>
              DELETE
            </button>
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default Shipment;
