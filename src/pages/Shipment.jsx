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
      setShipment(data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteShipment = async () => {};

  return (
    <div>
      <h2>Shipment</h2>
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
                  <td>
                    <button onClick={() => deleteShipment(item.itemid)}>
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

export default Shipment;
