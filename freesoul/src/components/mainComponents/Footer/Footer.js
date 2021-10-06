import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IconContext} from "react-icons"
import {FaWhatsapp} from 'react-icons/fa';
import {FaInstagram} from 'react-icons/fa';
import {AiOutlineFacebook} from 'react-icons/ai';

export default function Footer(){
    return(
        <>
            <div className="fContainer">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-4">
                            <h2 className="h2Footer">Nosotras</h2>
                            <p className="text-justify pFooter"> Lorem bla bla blaLorem bla bla blaLorem bla bla blaLorem bla bla blaLorem bla bla blaLorem bla bla blaLorem bla bla bla</p>
                            <p className="bold">Leer más</p>
                            <IconContext.Provider value={{style: {margin:'10px', width:'50px', height:'auto', color:"#4d6ab2"}}}>
                                <FaInstagram/>
                                <AiOutlineFacebook/>
                                <FaWhatsapp/>
                            </IconContext.Provider>

                        </div>
                        <div className="col-lg-4 text-left">
                            <h2 className="h2Footer">Ayuda</h2>
                            <ul>
                                <button className="btnPopUp" >Buscar</button><br/>
                                <button className="btnPopUp" >Contáctanos</button><br/>
                                <button className="btnPopUp" >Políticas de Reembolso</button><br/>
                                <button className="btnPopUp" >Términos de Servicio</button><br/>
                                <button className="btnPopUp" >Políticas de Privacidad</button>
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <h2 className="h2Footer">Newsletter</h2>
                            <p className="pFooter">¿Te gustaría conocer las promos que manejamos según la temporada? Sorteos y más cosas, deja tu correo electrónico</p>
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