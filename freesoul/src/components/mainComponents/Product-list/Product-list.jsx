import React, { useEffect, useState } from "react";
//import { response } from "../../../../../apirest/routes/picture.route";
import { apiRoute } from "../../../config/Config";

import Product from "./Product";

import "./product-list.styles.css";


function ProductList() {
  const[galery, setGalery] = useState([]);

  useEffect(() => {
    productsGalery();
  },[])


  const productsGalery = async () => {
    const res  = await getPictures()
    setGalery(res.data);
  };

  console.log(galery);

  return (
    <div className="product-list">
      {galery.map((gal, index) => {
        return <Product key={gal._id} product={gal} />;
      })}
    </div>
  );
}

const getPictures = () => {
  const url = `${apiRoute}/show-pictures`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

export default ProductList;
