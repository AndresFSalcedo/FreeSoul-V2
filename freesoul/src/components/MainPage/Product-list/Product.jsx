import React from "react";


import "./product.styles.css";

function Product(props) {
  return (
    <div className="product-container">
      <img
        className= "imagen"
        alt="Product"
        src={process.env.PUBLIC_URL + `Imgs/rsz_img_9818.jpg`}
      ></img>
      <h2 key={props.product.id} className="fuente">Mi cuerpo, mi decisión</h2>
      <p className="fuente">$76.000</p>
    </div>
  );
}

export default Product;






// https://robohash.org/${props.product.id}?set=set4&size=180x180