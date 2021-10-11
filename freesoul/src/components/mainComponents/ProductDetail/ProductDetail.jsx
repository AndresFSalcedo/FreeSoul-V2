import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import $ from "jquery";
import { apiRoute } from "../../../config/Config";
import './Modal.css';

export default function ProductDetail(props) {

  const [images, setImages] = useState([
    {
      original: "",
      thumbnail: "",
    },
  ]);

  const [stock, setStock] = useState({
    
    design: '',
    price: '',
    stock:[],
    images:[]

  });

  const [maxQuantity, setMaxQuantity] = useState(0);

  let reserve = new Reserve

  useEffect(() => {
    $(document).on("click", ".product-container", function (e) {
      e.preventDefault();

      $('#sizeS').prop("disabled", true)
      $('#sizeM').prop("disabled", true)
      $('#sizeL').prop("disabled", true)
      $('#sizeXL').prop("disabled", true)

      let data = JSON.parse($(this).attr("data"));
      
      reserve.design = data[0].design
      reserve.price = data[0].price
      reserve.productCode = data[0].productCode
      reserve.image = data[0].images[0]
      
      const colombianCOP = Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      });

      let imgsArray = [];

      for (let i = 0; i < data[0].images.length; i++) {
        imgsArray.push({
          original: `${apiRoute}/show-pictureImg/${data[0].images[i]}`,
          thumbnail: `${apiRoute}/show-pictureImg/${data[0].images[i]}`,
        });
      }

      setImages(imgsArray)

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

      setStock({

        design: (data[0].design.split(/(?=[A-Z])/).join(" ")).toUpperCase(),
        price: colombianCOP.format(`${data[0].price}`),
        stock: colorStock,
        images: imgsArray
      });

      $('#quantity').text('0')

    });
  }, []);

  function setColor(){
    let html = document.getElementById('color');
    let result = '';
    stock.stock.forEach(color=>{

      const id = color[0]

      result += `<button class="mr-3 colorButton" id="${id}" style="background-color:${color[0]}"></button>`;

      $(document).on("click", `#${id}`, function (color){

        reserve.color = id

        let indexQuantity = '';

        $('#sizeS').prop("disabled", true)
        $('#sizeM').prop("disabled", true)
        $('#sizeL').prop("disabled", true)
        $('#sizeXL').prop("disabled", true)

        for (let i = 0; i < stock.stock.length;i++){
          if(stock.stock[i][0] === id){

            if(stock.stock[i][1] > 0){
              $('#sizeS').prop("disabled", false)
              indexQuantity = i;
            }

            if(stock.stock[i][2] > 0){
              $('#sizeM').prop("disabled", false)
              indexQuantity = i;
            }

            if(stock.stock[i][3] > 0){
              $('#sizeL').prop("disabled", false)
              indexQuantity = i;
            }

            if(stock.stock[i][4] > 0){
              $('#sizeXL').prop("disabled", false)
              indexQuantity = i;
            }

          }
        }

        $(document).on("click", "#sizeS", function (){
          $('#quantity').text('0')
          setMaxQuantity(stock.stock[indexQuantity][1])
          reserve.size = 'S'
        })
        $(document).on("click", "#sizeM", function (){
          $('#quantity').text('0')
          setMaxQuantity(stock.stock[indexQuantity][2])
          reserve.size = 'M'
        })
        $(document).on("click", "#sizeL", function (){
          $('#quantity').text('0')
          setMaxQuantity(stock.stock[indexQuantity][3])
          reserve.size = 'L'
        })
        $(document).on("click", "#sizeXL", function (){
          $('#quantity').text('0')
          setMaxQuantity(stock.stock[indexQuantity][4])
          reserve.size = 'XL'
        })
      })
    })

    if(result !== ''){

      html.innerHTML = result
    }
    
  }

 //Se ejecutan las funciones
  setColor()
  console.log(reserve)

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
                    <h1 className="modalTitle">{stock.design}</h1>
                  </div>
                  <div className="mb-4">
                    <h5 className="modalPrice">{stock.price}</h5>
                  </div>
                  <div className="mb-4">
                    <h4 className="modalText text-left mb-2">Color</h4>
                    <div className="text-center" id="color" ></div>
                  </div>
                  <div className="mb-4">
                    <h4 className="modalText text-left mb-2">Talla</h4>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        id="sizeS"
                      >
                        S
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        id="sizeM"
                      >
                        M
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        id="sizeL"
                      >
                        L
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-3"
                        id="sizeXL"
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
                      <button type="button" className="btn btn-primary px-3" id="quantity" disabled></button>
                      <button type="button" className="btn btn-primary" onClick={()=>{

                        let quantity = parseInt(document.getElementById("quantity").textContent)
                        if(quantity < maxQuantity){
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
                      onClick={()=>{
                        reserve.quantity = ($('#quantity').val())
                        console.log(reserve)
                      }}
                    >
                      Agregar a tu bolsa
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                      onClick={()=>{
                        reserve.quantity = ($('#quantity').val())
                        console.log(reserve)
                      }}
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
