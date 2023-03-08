import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = (props) => {
  const [cart, setCart] = useState();
  const [shippedStatus, setShipppedStatus] = useState(false);
  const [newQuantity, setNewQuantity] = useState()

  const getCart = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/allcart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: props.emailId }),
      });
      const data = await res.json();
      console.log(data);
      setCart(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCart = async (id) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/deletecart", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ emailId: props.emailId, itemId: id }),
      });
      const data = await res.json();
      console.log(data);
      setCart(cart.filter((item) => item.itemid !== id));

      if (data === "cart item successfully removed") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCart = async (cartid, itemid) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/updatecart", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({newQuantity: newQuantity, cartId: cartid, itemId: itemid})
      });
      const data = await res.json()
      console.log(data)

      if (data === "cart updated") {
        toast.success(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (data === "please enter quantity") {
        toast.warning(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleUpdateCart = (e) => {
    setNewQuantity(e.target.value)
  }

  const addToShipment = async (id) => {
    const res = await fetch("http://127.0.0.1:5000/api/addtoshipment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ emailId: props.emailId, cartId: id, shipmentId: props.emailId }),
    });
    const data = await res.json();
    console.log(data);
    setShipppedStatus(true);
  };

  return (
    <div>
      <ToastContainer/>
      <h2 className="text-7xl">CART</h2>
      <h3>email id: {props.emailId}</h3>
      <h3>item id: {props.itemId}</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <button onClick={() => getCart()}>All Cart</button>
          {shippedStatus ||
            (cart &&
              cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.cart_item}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button onClick={() => deleteCart(item.itemid)} className="border">
                        DELETE
                      </button>
                    </td>
                    <td>
                      <input type="text" value={newQuantity} onChange={handleUpdateCart} className="border"/>
                      <button onClick={() => updateCart(item.cartid, item.itemid)} className="border">
                        UPDATE CART
                      </button>
                    </td>
                  </tr>
                );
              }))}
          <button onClick={() => addToShipment(cart[0].cartid)}>PAY</button>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
