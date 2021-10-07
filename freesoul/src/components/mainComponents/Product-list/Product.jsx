import React from "react";
import "./product.styles.css";
//import $ from "jquery";
import {apiRoute} from "../../../config/Config";
import ProductDetail from "../ProductDetail/ProductDetail"

export default function Product(props) {
  
  const design=(props.product.design).split(/(?=[A-Z])/).join(" ")

  // PONER EN EL <A> data={data}
  return (
    <>
      <a href="#/" className="product-container" data-toggle="modal" data-target="#detailProduct" >
        <img
          className= "imagen"
          alt="Product"
          src={`${apiRoute}/show-pictureImg/${props.product.image}`}
          style={{"width":"280px", "height":"390px"}}
        ></img>
        <h2 key={props.product.id} className="fuente">{design}</h2>
        <p className="fuente">$76.000</p>
      </a>

      <ProductDetail/>
    </>

  );
}

