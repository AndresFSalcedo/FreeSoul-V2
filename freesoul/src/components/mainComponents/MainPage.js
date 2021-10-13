<<<<<<< Updated upstream
import React, {useEffect, useState} from "react";
=======
import React, { useEffect, useState } from "react";

>>>>>>> Stashed changes
import "../App.css";

//import {Nav,Navbar} from 'react-bootstrap';
//import Logo from "../../assets/FreeSoulLogoweb-01.png";

import TabNav from "./NavBar/TabNav";
import Tab from "./NavBar/Tab";
import HomeBody from "./HomeBody/HomeBody";
//import ProductList from "./Product-list/Product-list";
import AboutUs from "./About/AboutUs";
import PictureNosotras from "./About/PicturesNosotras";
import Footer from "./Footer/Footer";
import Slide from "./Slide/Slide";
import ProductList from "./Product-list/Product-list";
import Blog from "./Blog/Blog"
import { apiRoute } from "../../config/Config";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CheckoutPage from "./checkout/checkout.component";


export default function MainPage() {

  //Hook used to get the tabs ordered
  const [selected, setSelected] = useState("Inicio");

  //Hook used for setting up the images
  const [galery, setGalery] = useState([""]);

  //Use effect used for getting the images of the front pages of
  // camisas and buzos

  useEffect(() => {
    productsGalery();
  }, []);

  //Function that brings the product galery
  const productsGalery = async () => {
    const res = await getPictures()
    setGalery(res.data);
  };

  // function that enables to bring all 
  const getPictures = () => {
    const url = `${apiRoute}/show-pictures`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  };

  // Method in charge of holdig the state of the tab section
  const currentSelected = (Tab) => {
    setSelected(Tab);
  };

  // Function in charge of filtering the camisetas 

  function camisetasFilter() {
    return galery.filter(gal =>
      gal.productType === "Camiseta"
    )

  }

  function buzosFilter() {
    return galery.filter(gal =>
      gal.productType === "Buzo"
    )
  }


  return (
    <div>

      {/*<Navbar 
        bg="myGreen" 
        variant="light"
        sticky="top"
        expand="md"
        collapseOnSelect
      >
        <Navbar.Toggle />
          
        <Navbar.Collapse >
          <Nav>
            <Nav.Link className="nav-link" href="#inicio">Inicio</Nav.Link>
            <Nav.Link className="nav-link" href="#camisetas">Camisetas</Nav.Link>
            <Nav.Link className="nav-link" href="#buzos">Buzos</Nav.Link>
            <Nav.Link className="nav-link" href="#blog">Blog</Nav.Link>
            <Nav.Link className="nav-link" href="#nosotras">Nosotras</Nav.Link>
            <Nav.Link className="nav-link" href="#freesoul">FreeSoul</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
      </Navbar>*/}


      <TabNav
        tabs={["Inicio", "Camisetas", "Buzos", "Blog", "Nosotras", "FreeSoul"]}
        selected={selected}
        setSelected={currentSelected}
      >
        <Tab isSelected={selected === "Inicio"}>
          <h1 className="titleMsg mt-5">
            ¡Siéntete poderosa con nuestras prendas!
          </h1>
          <Slide />
          <h1 className="titleMsg mt-5">Nuestros Productos</h1>
          <HomeBody />
          <BrowserRouter>
            <Switch>
              <Route exact path="/checkout" component={CheckoutPage} />
            </Switch>
          </BrowserRouter>
        </Tab>
        <Tab isSelected={selected === "Camisetas"}>
          <h1 className="titleMsg mt-5">Camisetas</h1>
          <ProductList products={camisetasFilter()} />
        </Tab>
        <Tab isSelected={selected === "Blog"}>
          <h1 className="titleMsg mt-5">Blog</h1>
          <p className="mt-3 container text-center" style={{"fontSize":"20px"}}>Querida Free Soul, aquí podrás estar informada sobre cosas claves del mundo del feminismo y amor propio</p>
          <Blog />
        </Tab>
        <Tab isSelected={selected === "Buzos"}>
          <h1 className="titleMsg mt-5">Buzos</h1>
          <ProductList products={buzosFilter()} />
        </Tab>
        <Tab isSelected={selected === "Nosotras"}>
          <h1 className="titleMsg mt-5">Nosotras</h1>
          <AboutUs />
          <PictureNosotras />
        </Tab>
        <Tab isSelected={selected === "FreeSoul"}>
          <h1 className="titleMsg mt-5">FreeSoul</h1>
          <br />
          <br />
          <center>
            <h3>Misión</h3>
            <p className="about-info">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 
            </p>
            <h3>Visión</h3>
            <p className="about-info">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Why do we use it? It is a long established fact that
              a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to
              using 
            </p>
          </center>
        </Tab>
        <Footer />
      </TabNav>
    </div>
  );
}