import React from 'react';
import "./style.css";

 function ProductDetail() {
  return (
    <div className = "card-wrapper detalles">
    <div className = "card detalles">
      {/* <!-- card left --> */}
      <div className = "product-imgs">
        <div className = "img-display">
          <div className = "img-showcase">
            <img src = {process.env.PUBLIC_URL + `/ProductDetpic/4.jpg`} alt="camiseta"></img>
            <img src = {process.env.PUBLIC_URL + `/ProductDetpic/5.jpg`} alt="camiseta"></img>
            <img src = {process.env.PUBLIC_URL + `/ProductDetpic/6.jpg`} alt="camiseta"></img>
            {/* <!-- <img src = "shoes_images/shoe_4.jpg" alt = "shoe image"> --> */}
          </div>
        </div>
        <div className = "img-select">
          <div className = "img-item">
             <a href = "#" data-id = "1">
             <img src = {process.env.PUBLIC_URL + `/ProductDetpic/4.jpg`} alt="camiseta"></img>
            </a>
          </div>
          <div className = "img-item">
            <a href = "#" data-id = "2">
            <img src = {process.env.PUBLIC_URL + `/ProductDetpic/5.jpg`} alt="camiseta"></img>
            </a>
          </div>
          <div className = "img-item">
            <a href = "#" data-id = "3">
            <img src = {process.env.PUBLIC_URL + `/ProductDetpic/6.jpg`} alt="camiseta"></img>
            </a>
          </div>
          {/* <div class = "img-item">
            <a href = "#" data-id = "4">
            <img src = {process.env.PUBLIC_URL + `/ProductDetpic/4.jpg`} alt="camiseta"></img> 
             </a>  
          </div> */}
        </div>
      </div>
      {/* <!-- card right --> */}
      <div className = "product-content">
        <h2 className = "product-title">De camino a casa</h2>
        <p className="price">$76.000</p>
        <div className = "product-detail">
          <br/>
          <br/>
          <h2>Tallas</h2>
          <button type = "button" className = "btn">S</button>
          <button type = "button" className = "btn">M</button>
          <button type = "button" className = "btn">L</button>
          <h2>Cantidad</h2>
          <div className="plusminus horiz">
            <button className="inc-dec"> +</button>
            <input className="mid-number" type="text" name="productQty" value="1" min="1" max="10"/> 
            <button className="inc-dec">-</button> 
          </div>
          <h2>Color</h2>
          <div className="colors">
            <div className="color" style={{backgroundColor: "#661f45"}} data-hex="#661f45" ></div>
            <div className="color" style={{backgroundColor: "#1e2024"}} data-hex="#1e2024"></div>
          </div>
        </div>

        <div className = "purchase-info"> 
          <button type = "button" className = "btn">
            Agregar a tu bolsa de reserva 
          </button>
          <button type = "button" className = "btn">Reservar ahora</button>
        </div>

        <p>Normalmente está listo en 24h </p>  
        <div className = "social-links">
          <p>Compartir en: </p>
          <a href = "#">
            <i className = "fab fa-facebook-f " ></i>
          </a>
          <a href = "#">
            <i className = "fab fa-instagram"></i>
          </a>
          <a href = "#">
            <i className = "fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}


export default ProductDetail;