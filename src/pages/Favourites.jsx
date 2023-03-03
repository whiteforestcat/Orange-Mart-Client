import React, { useState, useEffect } from "react";

const Favourites = () => {
  const [fav, setFav] = useState();

  const displayFav = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/allfavourites");
    const data = await res.json();
    // console.log(data);
    setFav(data);
  };

  const deleteFav = async (id) => {
    try {
        const res = await fetch(`http://127.0.0.1:5000/api/deletefav/${id}`, {
            method: "DELETE",
        });
        const data = await res.json()
        console.log(data)
        setFav(fav.filter((row) => row.id != id))
    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(() => {
    displayFav();
  }, []);

 
  return (
    <div>
      <h1>Favourites</h1>
      {fav && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>desciption</th>
              <th>price ($)</th>
              <th>account_id</th>
            </tr>
          </thead>
          <tbody>
            {fav.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.price}</td>
                <td>{row.account_id}</td>
                <td>
                  <button onClick={() => deleteFav(row.id)}>
                    Remove From Favourites
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Favourites;
