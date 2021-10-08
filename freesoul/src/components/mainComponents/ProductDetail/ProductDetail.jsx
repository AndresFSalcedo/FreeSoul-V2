import React, {useState} from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import $ from 'jquery';
import Image from './IMG_8836.jpg';

export default function ProductDetail() {

  const [images, setImages] = useState([
    {
      'original': "",
      'thumbnail': ""
    }
  ])

  $(document).on('click','.product-container', function (e){

    e.preventDefault();

    let data = JSON.parse($(this).attr("data"));

    const title = (data[0].design).split(/(?=[A-Z])/).join(" ")

    let colombianCOP = Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    })

    $('.modalTitle').text(title.toUpperCase())
    $('.modalPrice').text(colombianCOP.format(`${data[0].price}`))

    let imgsObj = []

    for (let i=0; i < data[0].images.length; i++){

      imgsObj.push({
        original: data[0].images[i],
        thumbnail: data[0].images[i]
      })
    }

    setImages(imgsObj)

  })
    

  return (
    <div className="modal fade" id="detailProduct">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{"backgroundColor":"#dbc6df"}}>
          <div className="modal-body">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="mt-5 container-fluid">
              <div className="row">
                <div className="col-lg-7" >
                  
                  <ImageGallery items={images} showPlayButton={false}/>

                </div>

                <div className="col-lg-5">
                  <div className="mb-4">
                    <h1 className="modalTitle">.</h1>
                  </div>
                  <div className="mb-4">
                    <h5 className="modalPrice">.</h5>
                  </div>
                  <div className="mb-3">
                    <h4 className="modalText text-left">Color:</h4>
                  </div>
                  <div className="mb-3">
                  <h4 className="modalText text-left">Talla:</h4>
                    <div className="text-center">
                      <button type="button" className="btn btn-outline-primary mr-3">S</button>
                      <button type="button" className="btn btn-outline-primary mr-3">M</button>
                      <button type="button" className="btn btn-outline-primary mr-3">L</button>
                      <button type="button" className="btn btn-outline-primary mr-3">XL</button>
                    </div>
                  </div>
                  <div className="mb-3">
                    Cantidad
                  </div>
                  <div className="mb-4">
                    <button type="button" className="btn btn-success btn-lg btn-block">Agregar a tu bolsa</button>
                  </div>
                  <div className="mb-4">
                    <button type="button" className="btn btn-primary btn-lg btn-block">Reservar ahora</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}


