import React, {useState, useEffect} from "react";
import "./product.styles.css";
//import $ from "jquery";
import {apiRoute} from "../../../config/Config";
import ProductDetail from "../ProductDetail/ProductDetail"

export default function Product(props) {

  //Hook for the stocks
  const [stocks, setStock] = useState([]);

  useEffect(() => {
    productStock();
  },[]);

  //Split for titles
  const design=(props.product.design).split(/(?=[A-Z])/).join(" ")

  //Create array with images with the same productCode
  function images (){

    return props.allImages.filter(img => 
      img.productCode === props.product.productCode
    )
  }

  const resultImages = images()
  const onlyImages = []

  resultImages.forEach((item)=>{
    onlyImages.push(item.image)
  })

  //Function that brings the product STOCK
  const productStock = async () => {
    const res  = await getStock()
    setStock(res.data);

  };

  //Get Stock
  const getStock = () => {
    const url = `${apiRoute}/show-stock`;
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
  
  //New array with all the data per Code
  function joinData() {

    let arrayData = [];

    for (let i = 0; i < stocks.length; i++){

      if(props.product.productCode === stocks[i].productCode){

        arrayData.push({
          "design": stocks[i].design,
          "color": stocks[i].codColor,
          "S": stocks[i].S,
          "M": stocks[i].M,
          "L": stocks[i].L,
          "XL": stocks[i].XL,
          "price": stocks[i].price,
          "productCode": stocks[i].productCode,
          "images": onlyImages

        })
      }
    }
    return arrayData;
  }

  let allData = JSON.stringify(joinData())

  return (
    <>
      <a href="#/" className="product-container" data-toggle="modal" data-target="#detailProduct" data={allData}>
        <img
          className= "imagen"
          alt="Product"
          src={`${apiRoute}/show-pictureImg/${props.product.image}`}
          style={{"width":"280px", "height":"390px"}}
        ></img>
        <h3 key={props.product.id} className="fuente">{design}</h3>
      </a>

      <ProductDetail/>
    </>

  );
}

