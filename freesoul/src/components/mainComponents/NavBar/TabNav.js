/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../../assets/FreeSoulLogoweb-01.png';
import { IconContext } from "react-icons";
import {FaWhatsapp} from 'react-icons/fa';
import {FaTruck} from 'react-icons/fa';
import {BiShoppingBag} from 'react-icons/bi'
import {RiMailSendLine} from 'react-icons/ri';
import "./TabNav.scss";

class TabNav extends React.Component {

    render(){
        return(
            <div className="container-tabnav-react">
                <div className="top-bar topBar">
                    <div className="container">
                        <div className="col-12">
                            <p className="text-white my-0">
                                Envíos a toda Colombia
                                <a className="topLink" href=""><FaWhatsapp/> Contáctanos</a>
                                <a className="topLink" href="https://envia.co/" target="_blank" rel="noreferrer"><FaTruck/> Sigue tu pedido</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tabcss">

                    <img className="logo" src={Logo} alt="FreeSoul-Logo"/>
                    <IconContext.Provider value={{ style:{ color:"#4d6ab2", width:"65px", height:"auto"}}}>
                        <span className="icon1" ><BiShoppingBag/></span> 
                    </IconContext.Provider>
                    <IconContext.Provider value={{ style:{ color:"#4d6ab2", width:"60px", height:"auto"}}}>
                        <span className="icon2" ><RiMailSendLine/></span> 
                    </IconContext.Provider>
                    
                </div>
                    
                <div>
                    <ul className="nav nav-tabs justify-content-center tabcss pt-2">
                        {
                            this.props.tabs.map(tab => {
                                const active =(tab === this.props.selected ? 'active' : '');
                                return(
                                    <li className="nav-item" key={tab}>
                                        <a href="#" className={"nav-link " + active} onClick={ () => this.props.setSelected(tab)}>
                                            {tab}
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default TabNav;