import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import {IconContext} from "react-icons";
import {FaWhatsapp} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {AiOutlineFacebook} from 'react-icons/ai';

export default function Footer(){

    $(document).on("click","#nosotras",function(){
        
    })

    return(
        <>
            <div className="fContainer">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-4 mt-4">
                            <h2 className="h2Footer">Nosotras</h2>
                            <p className="text-justify pFooter"> La razón de ser de Free Soul empezó desde nuestro deseo de recordarles a todas las mujeres TODOS LOS DIAS, lo valiosas, fuertes y hermosas que son por fuera y por dentro...</p>
                            <p className="bold" id="nosotras">Leer más</p>
                            <IconContext.Provider value={{style: {margin:'10px', width:'50px', height:'auto', color:"#4d6ab2"}}}>
                                <a href="https://www.instagram.com/freesoul.tshirts/"><FaInstagram/></a>
                                <a href="https://www.facebook.com/freesoultshirt/"><AiOutlineFacebook/></a>
                                <a href="https://l.instagram.com/?u=http%3A%2F%2Fbit.ly%2FFreeSoulwa&e=ATNmdqRm14cMO_wKDppsLIMWDl_ZjX_ge5KNI6diCIXbkuPtOvz17Llk0hREO-ZBeRjhpi2KTvXjSuMg8LVZum3srNwQWUyCV4ZoZQ&s=1"><FaWhatsapp/></a>
                            </IconContext.Provider>

                        </div>
                        <div className="col-lg-4 text-left mt-4">
                            <h2 className="h2Footer">Información</h2>
                            <ul>
                                <button className="btnPopUp" >Políticas de Reembolso</button><br/>
                                <button className="btnPopUp" >Términos de Servicio</button><br/>
                                <button className="btnPopUp" >Políticas de Privacidad</button>
                            </ul>
                        </div>
                        <div className="col-lg-4 mt-4">
                            <h2 className="h2Footer">Newsletter</h2>
                            <p className="pFooter">¿Te gustaría conocer las promos que manejamos según la temporada? Sorteos y más cosas, deja tu correo electrónico</p>
                            <input className="inputFooter mb-2" id="name" type="text" placeholder="  Nombre"></input>
                            <input className="inputFooter" id="email" type="email" placeholder="  Correo Electrónico"></input>
                            <div className="btnSpace">
                                <button className="btnSend">Enviar</button>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <div className="nav-bar botBar">
                <div className="container my-0">
                    <div className="col-12">
                        <p className="my-0 text-white">2021 FreeSoul</p>
                    </div>
                </div>
            </div>
        </>
    )
}