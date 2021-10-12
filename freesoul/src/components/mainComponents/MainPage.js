import React, {useEffect, useState} from "react";

import "../App.css";

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

export default function MainPage() {

  //Hook used to get the tabs ordered
  const [selected, setSelected] = useState("Inicio");

  //Hook used for setting up the images
  const[galery, setGalery] = useState([""]);
  
  //Use effect used for getting the images of the front pages of
  // camisas and buzos

  useEffect(() => {
    productsGalery();
  },[]);

  //Function that brings the product galery
  const productsGalery = async () => {
    const res  = await getPictures()
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

  function camisetasFilter () {
    return galery.filter(gal => 
      gal.productType === "Camiseta"
      )

  }

  function buzosFilter () {
    return galery.filter(gal => 
      gal.productType === "Buzo" 
    )
  }

  
  return (
    <div>
      <TabNav
        tabs={["Inicio", "Camisetas", "Buzos", "Blog", "Nosotras", "FreeSoul"]}
        selected={selected}
        setSelected={currentSelected}
      >
        <Tab isSelected={selected === "Inicio"}>
          <h1 className="titleMsg mt-5">
            ¡Siéntete poderosa con nuestras prendas!
          </h1>
          <Slide/>
          <h1 className="titleMsg mt-5">Nuestros Productos</h1>
          <HomeBody />
        </Tab>

        <Tab isSelected={selected === "Camisetas"}>
          <h1 className="titleMsg mt-5">Camisetas</h1>
          <ProductList products={camisetasFilter()}/>          
        </Tab>
        <Tab isSelected={selected === "Blog"}>
          <h1 className="titleMsg mt-5">Blog</h1>
          <p className="mt-3 container text-center">Querida Free Soul, aquí podrás estar informada sobre cosas claves del mundo del feminismo y amor propio</p>
          <Blog />
        </Tab>
        <Tab isSelected={selected === "Buzos"}>
          <h1 className="titleMsg mt-5">Buzos</h1>
          <ProductList products={buzosFilter()}/>
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
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32.
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
              using 'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32.
            </p>
          </center>
        </Tab>
        <Footer />
      </TabNav>
    </div>
  );


}