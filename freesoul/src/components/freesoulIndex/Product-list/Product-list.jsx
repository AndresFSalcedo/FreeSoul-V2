import React from "react";

import Product from "./Product";

import "./product-list.styles.css";

function ProductList(props) {
  return (
    <div className="product-list">
      {
        props.products.map((product, index) => {
          return <Product key={product.id} product={product}/>
        })
      }
    </div>
  )
}
export default ProductList;