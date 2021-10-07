import React from 'react';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/scss/image-gallery.scss";


//import "./style.css";
import Image from './IMG_8836.jpg';

export default function ProductDetail() {

  const images = [
    {
      "original": `${Image}`,
      "thumbnail": `${Image}`
    },{
      "original": `${Image}`,
      "thumbnail": `${Image}`
    }
  ];


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
                <div className="col-lg-6" >
                  
                  <ImageGallery items={images} showPlayButton={false}/>

                </div>

                <div className="col-lg-6">
                  <div className="mb-2" style={{"":"#4d6ab2"}}>
                    Titulo
                  </div>
                  <div className="mb-2">
                    Precio
                  </div>
                  <div className="mb-2">
                    Color
                  </div>
                  <div className="mb-2">
                    Tallas
                  </div>
                  <div className="mb-2">
                    Cantidad
                  </div>

                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-success">Agregar a tu bolsa</button>
                    <button type="button" className="btn btn-primary">Reservar ahora</button>

                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}


