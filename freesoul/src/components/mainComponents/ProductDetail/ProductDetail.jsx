import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import $ from "jquery";
import { apiRoute } from "../../../config/Config";
import './Modal.css';

export default function ProductDetail() {
  const [images, setImages] = useState([
    {
      original: "",
      thumbnail: "",
    },
  ]);

  const [colorStock, setColorStock] = useState([]);

  useEffect(() => {
    $(document).on("click", ".product-container", function (e) {
      e.preventDefault();

      let data = JSON.parse($(this).attr("data"));
      console.log(data);
      const title = data[0].design.split(/(?=[A-Z])/).join(" ");

      const colombianCOP = Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      });

      $(".modalTitle").text(title.toUpperCase());
      $(".modalPrice").text(colombianCOP.format(`${data[0].price}`));

      let imgsObj = [];

      for (let i = 0; i < data[0].images.length; i++) {
        imgsObj.push({
          original: `${apiRoute}/show-pictureImg/${data[0].images[i]}`,
          thumbnail: `${apiRoute}/show-pictureImg/${data[0].images[i]}`,
        });
      }

      let colorStock = [];

      for (let i = 0; i < data.length; i++) {
        colorStock.push([
          `${data[i].color}`,
          `${data[i].S}`,
          `${data[i].M}`,
          `${data[i].L}`,
          `${data[i].XL}`
        ]);
      }

      setImages(imgsObj);
      setColorStock(colorStock);

    });
  }, []);

  function setColor(){
    let html = document.getElementById('color');
    let result = '';
    colorStock.forEach((color, index)=>{

      result += `<button class="mr-3 colorButton" style="background-color:${color[0]}"></button>`;
    })
    if(result !== ''){

      html.innerHTML = result
    }
    
  }

  setColor()

 // VISTA DEL COMPONENTE
  return (
    <div className="modal fade" id="detailProduct">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ "backgroundColor": "#dbc6df" }}>
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="mt-5 container-fluid">
              <div className="row">
                <div className="col-lg-7">
                  <ImageGallery items={images} showPlayButton={false} />
                </div>

                <div className="col-lg-5">
                  <div className="mb-4">
                    <h1 className="modalTitle">.</h1>
                  </div>
                  <div className="mb-4">
                    <h5 className="modalPrice">.</h5>
                  </div>
                  <div className="mb-4">
                    <h4 className="modalText text-left mb-2">Color</h4>
                    <div className="text-center" id="color"></div>
                  </div>
                  <div className="mb-4">
                    <h4 className="modalText text-left mb-2">Talla</h4>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        disabled
                      >
                        S
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        disabled
                      >
                        M
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        disabled
                      >
                        L
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        disabled
                      >
                        XL
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="modalText text-left">Cantidad</h4>
                    <div className="btn-group " role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-primary" onClick={()=>{
                        
                        let quantity = parseInt(document.getElementById("quantity").textContent)
                        if(quantity !== 0){
                          quantity -= 1
                          $('#quantity').text(quantity)
                        }
                        return
                      }}>-</button>
                      <button type="button" className="btn btn-primary px-3" id="quantity" disabled>0</button>
                      <button type="button" className="btn btn-primary" onClick={()=>{

                        let quantity = parseInt(document.getElementById("quantity").textContent)
                        if(quantity < 10){
                          quantity += 1
                          $('#quantity').text(quantity)
                        }
                      }}>+</button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-block"
                    >
                      Agregar a tu bolsa
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      Reservar ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
