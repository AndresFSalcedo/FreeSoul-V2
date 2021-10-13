import React, { useEffect, useState } from "react";

import "../App.css";

import TabNav from "./NavBar/TabNav";
import Tab from "./NavBar/Tab";
import HomeBody from "./HomeBody/HomeBody";
import AboutUs from "./About/AboutUs";
import PictureNosotras from "./About/PicturesNosotras";
import Footer from "./Footer/Footer";
import Slide from "./Slide/Slide";
import ProductList from "./Product-list/Product-list";
import Blog from "./Blog/Blog";
import FreeSoul from "./MisionVision/FreeSoul"
import { apiRoute } from "../../config/Config";
import CheckoutPage from './checkout/checkout.component'



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

  function swapTap(tab) {
    setSelected(tab);
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <TabNav
        tabs={["Inicio", "Camisetas", "Buzos", "Blog", "Nosotras", "FreeSoul", "Tu Reserva"]}
        selected={selected}
        setSelected={currentSelected}
      >
        <Tab isSelected={selected === "Inicio"}>
          <Slide />
          <HomeBody swapTap={swapTap}/>
        </Tab>
        <Tab isSelected={selected === "Camisetas"}>
          <h1 className="titleMsg mt-5">Camisetas</h1>
          <ProductList products={camisetasFilter()} />
        </Tab>
        <Tab isSelected={selected === "Blog"}>
          <Blog />
        </Tab>
        <Tab isSelected={selected === "Buzos"}>
          <h1 className="titleMsg mt-5">Buzos</h1>
          <ProductList products={buzosFilter()} />
        </Tab>
        <Tab isSelected={selected === "Nosotras"}>
          <AboutUs/>
          <PictureNosotras />
        </Tab>
        <Tab isSelected={selected === "FreeSoul"}>
          <FreeSoul />
        </Tab>
        <Tab isSelected={selected === "Tu Reserva"}>
          <CheckoutPage/>
        </Tab>
        <Footer swapTap={swapTap}/>
      </TabNav>
    </div>
  );
}