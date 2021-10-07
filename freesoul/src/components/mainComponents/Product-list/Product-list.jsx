<<<<<<< Updated upstream
import React from "react";
//import { response } from "../../../../../apirest/routes/picture.route";
=======
import React, { useEffect, useState } from "react";
import { apiRoute } from "../../../config/Config";
>>>>>>> Stashed changes

import Product from "./Product";
import "./product-list.styles.css";

<<<<<<< Updated upstream
function ProductList(props) {
  // This function filter the images existent in the array in props
  let uniqueImagesGalery = props.products.filter(
    (prodFilter, index) =>
      index ===
      props.products.findIndex((prodRemove) => prodRemove.productCode === prodFilter.productCode)
  );
=======
function ProductList() {
  const [galery, setGalery] = useState([]);

  useEffect(() => {
    productsGalery();
  }, []);

  const productsGalery = async () => {
    const res = await getPictures();
    setGalery(res.data);
  };
>>>>>>> Stashed changes

  return (
    // the unique images are being passed one by one
    <div className="product-list">
      {uniqueImagesGalery.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
}

export default ProductList;
