import React, { useEffect, useState } from 'react';

import "./App.css";

import TabNav from './components/MainPage/NavBar/TabNav';
import Tab from './components/MainPage/NavBar/Tab';
import Slider from './components/MainPage/Slider/Slider';
import HomeBody from './components/MainPage/HomeBody/HomeBody';
import ProductList from  './components/MainPage/Product-list/Product-list';
import AboutUs from './components/MainPage/About/AboutUs';
import PictureNosotras from './components/MainPage/About/PicturesNosotras';
import Footer from './components/MainPage/Footer/Footer';
import "../src/scripts/jdSlider.css";
import Carousel from './components/MainPage/Carousel/Carousel.component';

export default function MainPage() {
  
  const [selected, setSelected] = useState("Inicio");
  //const [products, setProducts] = useState([]);


  /*useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json()
    .then(users => setProducts(users)))
  })*/

  const currentSelected = (Tab) => {
    setSelected(Tab);
  }

  

  return (
    <div>
      <TabNav tabs={['Inicio', 'Camisetas', 'Buzos', 'Blog', 'Nosotras', 'FreeSoul']} selected={selected} setSelected={currentSelected}>
        <Tab isSelected={selected === 'Inicio'}>
          <h1 className="titleMsg mt-5">¡Siéntete poderosa con nuestras prendas!</h1>
          <Slider />
          <h1 className="titleMsg mt-5">Nuestros Productos</h1>
          <HomeBody />
        </Tab>

        <Tab isSelected={selected === 'Camisetas'}>
          <h1 className="titleMsg mt-5">Camisetas</h1>
        {/*<ProductList products={products} />*/}  
        </Tab>
        <Tab isSelected={selected === 'Blog'}>
        <p>Blog</p>
      </Tab>
      <Tab isSelected={selected === 'Buzos'}>
        <h1 className="titleMsg mt-5">Buzos</h1>
        {/*<ProductList products={products} />*/}
      </Tab>
      <Tab isSelected={selected === 'Nosotras'}>
        <h1 className="titleMsg mt-5">Nosotras</h1>
        <AboutUs />
        <PictureNosotras />
      </Tab>
      <Tab isSelected={selected === 'FreeSoul'}>
        <h1 className="titleMsg mt-5">FreeSoul</h1>
        <br/>
        <br/>
        <center>
          <h3>
          
            Misión
          </h3>
          <p className="about-info">      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default model
            text, and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years, sometimes by
            accident, sometimes on purpose (injected humour and the like). Where does
            it come from? Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure
            Latin words, consectetur, from a Lorem Ipsum passage, and going through
            the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
            Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in
            45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
            sit amet..", comes from a line in section 1.10.32.</p>
          <h3>
            Visión
          </h3>
          <p className="about-info">      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Why do we use it? It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default model
            text, and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years, sometimes by
            accident, sometimes on purpose (injected humour and the like). Where does
            it come from? Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure
            Latin words, consectetur, from a Lorem Ipsum passage, and going through
            the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
            Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in
            45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
            sit amet..", comes from a line in section 1.10.32.</p>
        </center>
      </Tab>
        <Footer/>
      </TabNav>
    </div>
  )
}

