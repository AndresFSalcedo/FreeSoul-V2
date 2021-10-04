import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cover from "../../../imgMain.jpg";
import "./HomeBody.css";

export default function HomeBody() {
  return(
    <div className="mt-5 bChurrusco">

        <div className="row">
            <div className="col-6">
                <div className="picHome">
                    <img 
                        src={Cover}
                        alt="Buzos"
                    />
                </div>  
            </div>                
            <div className="col-6">
                <div className="picHome">
                    <img 
                        src={Cover}
                        alt="Buzos"
                    />
                </div>  
            </div>  
        </div>

        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
                <div className="picHome">
                    <img 
                        src={Cover}
                        alt="Buzos"
                    />
                </div>
            </div>
            <div className="col-3"></div>
        </div>
    </div>
)
}


