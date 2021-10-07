import React from "react";
import Product from "./Product";
import "./product-list.styles.css";

function ProductList(props) {
  
  // This function filter the images existent in the array in props
  let uniqueImagesGalery = props.products.filter(
    (prodFilter, index) =>
      index ===
      props.products.findIndex((prodRemove) => prodRemove.productCode === prodFilter.productCode)
  );

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
