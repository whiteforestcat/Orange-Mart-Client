import React, { useState } from "react";

const Cart = (props) => {
  const [cart, setCart] = useState();

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
                "Content-type": "application/json"
            },
            body: JSON.stringify({emailId: props.emailId, itemId: id})
        });
        const data = await res.json()
        console.log(data)
        setCart(cart.filter((item) => item.itemid !== id))
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <div>
      <h2>CART</h2>
      <h3>email id: {props.emailId}</h3>
      <h3>item id: {props.itemId}</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          <button onClick={() => getCart()}>All Cart</button>
          {cart &&
            cart.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.cart_item}</td>
                  <td>
                    <button onClick={() => deleteCart(item.itemid)}>
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

export default Cart;
