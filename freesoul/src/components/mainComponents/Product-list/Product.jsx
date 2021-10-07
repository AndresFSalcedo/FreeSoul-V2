import React from "react";


import "./product.styles.css";
import {apiRoute} from "../../../config/Config";

function Product(props) {
  // console.log(props.product.image);
  const design=(props.product.design).split(/(?=[A-Z])/).join(" ")
  return (
    <div className="product-container">
      <img
        className= "imagen"
        alt="Product"
        src={`${apiRoute}/show-pictureImg/${props.product.image}`}
        style={{"width":"280px", "height":"390px"}}
      ></img>
      <h2 key={props.product.id} className="fuente">{design}</h2>
      <p className="fuente">$76.000</p>
    </div>
  );
}

export default Product;






// https://robohash.org/${props.product.id}?set=set4&size=180x180