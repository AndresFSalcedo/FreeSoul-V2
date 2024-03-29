/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../../assets/FreeSoulLogoweb-01.png";
import { IconContext } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import CartDropdown from "../cart-dropdown/cart-dropdown.component"; //traer

import CartIcon from "../cart-icon/cart-icon.component"; //traer
import "./TabNav.scss";

import { connect } from "react-redux"; //traer

import Mailto from "../ButtonMailto/ButtonMailto.component";

const TabNav = (props) => (
    <div className="container-tabnav-react">
        <div className="top-bar topBar">
            <div className="container">
                <div className="col-12">
                    <p className="text-white my-0 hide">
                        Envíos a toda Colombia
                        <a className="topLink" id="whatsApp" href="http://bit.ly/FreeSoulwa">
                            <FaWhatsapp /> Contáctanos
                        </a>
                        <a
                            className="topLink"
                            id="envia"
                            href="https://envia.co/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaTruck /> Sigue tu pedido
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div className="tabcss">
            <img className="logo" src={Logo} alt="FreeSoul-Logo" />
            <IconContext.Provider
                value={{ style: { color: "#4d6ab2", width: "65px", height: "auto" } }}
            >
                <span className="icon1">
                    <CartIcon />
                    {props.hidden ? null : <CartDropdown setSelected={props.setSelected}/>}
                </span>

            </IconContext.Provider>

            <IconContext.Provider
                value={{ style: { color: "#4d6ab2", width: "60px", height: "auto" } }}
            >
                <span className="icon2">
                    <Mailto email="freesoulshirts@gmail.com" subject="Retroalimentación servicio" body="Hola Freesoul">
                        <RiMailSendLine/>
                    </Mailto>
                </span>
            </IconContext.Provider>

        </div>


        <div>
            <ul className="nav nav-tabs justify-content-center tabcss pt-2">
                {props.tabs.map((tab) => {
                    const active = tab === props.selected ? "active" : "";
                    return (
                        <li className="nav-item" key={tab}>
                            <a
                                href="#"
                                className={"nav-link " + active}
                                onClick={() => props.setSelected(tab)}
                            >
                                {tab}
                            </a>
                        </li>
                    );
                })}
            </ul>
            {props.children}
        </div>
    </div>
);

const mapStateToProps = ({ cart: { hidden } }) => ({
    hidden,
});

export default connect(mapStateToProps)(TabNav);
