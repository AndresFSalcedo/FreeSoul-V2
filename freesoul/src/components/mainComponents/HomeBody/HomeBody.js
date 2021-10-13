import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeBody.css";
import Left from './1.jpg';
import Right from './2.jpg';
import Center from './3.jpg';

export default function HomeBody(props) {

    return (
        <div>
            <h1 className="titleMsg mt-5">Nuestros Productos</h1>
            <div className="pt-5 col-lg-12 bChurrusco">
                <div className="row">
                    <div className="col-lg-6">

                        <div onClick={() => props.swapTap('Buzos')} className="picHome" id="fotoLeft">
                            <img src={Center} alt="Foto" />
                            <div className="picText back-pink">Buzos</div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div onClick={() => props.swapTap('Camisetas')} className="picHome" id="fotoRight">
                            <img src={Right} alt="" />
                            <div className="picText back-purple">Buzos</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">

                        <div className="picHome" id="fotoCenter">
                            <img src={Left} alt="" />
                            <div className="picText back-green">Nuevo Diseño</div>
                            <div onClick={() => {
                                props.swapTap('Buzos')
                                }
                            }></div>

                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
        
        );
}
