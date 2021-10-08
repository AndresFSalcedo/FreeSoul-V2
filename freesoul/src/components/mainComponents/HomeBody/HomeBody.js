import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeBody.css";
import Left from './1.jpg';
import Right from './2.jpg';
import Center from './3.jpg';

export default function HomeBody() {
    
    return (
        <div className="pt-5 col-lg-12 bChurrusco">
            <div className="row">
                <div className="col-lg-6">
                    <div className="picHome" id="fotoLeft">
                        <img src={Center} alt=""/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="picHome" id="fotoRight">
                        <img src={Right} alt=""/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="picHome" id="fotoCenter">
                        <img src={Left} alt=""/>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    );
}
