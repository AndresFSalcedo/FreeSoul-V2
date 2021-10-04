import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeBody.css";
import {apiRoute} from "../../../config/Config";
import $ from 'jquery';

export default function HomeBody() {

    const picturesMP = async()=>{

        const getAllPictures = await getPictures();
        
        let imgCenter = getAllPictures.data[1].image
        let imgLeft = getAllPictures.data[25].image
        let imgRight = getAllPictures.data[32].image

        let fotoCenter = document.getElementById("fotoCenter")
        let fotoLeft = document.getElementById("fotoLeft")
        let fotoRight = document.getElementById("fotoRight")

        fotoCenter.innerHTML = `<img alt="img" src="${apiRoute}/show-pictureImg/${imgCenter}">`
        fotoLeft.innerHTML = `<img alt="img" src="${apiRoute}/show-pictureImg/${imgLeft}">`
        fotoRight.innerHTML = `<img alt="img" src="${apiRoute}/show-pictureImg/${imgRight}">`
         
    }

    picturesMP();
    
    return (
        <div className="pt-5 col-lg-12 bChurrusco">
            <div className="row">
                <div className="col-lg-6">
                    <div className="picHome" id="fotoLeft">
                        
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="picHome" id="fotoRight">
                        
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="picHome" id="fotoCenter">
                        
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    );
}

const getPictures = ()=> {

    const url = `${apiRoute}/show-pictures`;
    const params = {

        method:"GET",
        headers: {

            "Content-Type": "application/json"
        }
    }

    return fetch(url, params).then(response =>{

        return response.json();
    }).then(result =>{

        return result
    }).catch(err =>{

        return err
    })

}