import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Componente Login
import Login from "./login/Login";

// Componente MainPage
import MainPage from "../mainComponents/MainPage";

// Componentes Fijos
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";

// Componentes Dinamicos
import AdminsProducts from "./contents/admins/Admins.Products";
import Stocks from "./contents/stocks/Stocks";
import Reserves from "./contents/reserves/Reserves";
import Slides from "./contents/slides/Slides";
import Pictures from "./contents/pictures/Pictures";
import Blogs from "./contents/blogs/Blogs";
import Users from "./contents/users/Users";
import Error404 from "./contents/404error/Error404";

export default function AdminPage() {
  const auth = getAccessToken();

  if (!auth) {

    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    )
  }

  return (
    <div className="sidebar-mini">
      <div className="wrapper">
        <Header />
        <Sidebar />

        <BrowserRouter>
          <Switch>
            <Route exact path="/admins&products" component={AdminsProducts} />
            <Route exact path="/stocks" component={Stocks} />
            <Route exact path="/reserves" component={Reserves} />
            <Route exact path="/slides" component={Slides} />
            <Route exact path="/pictures" component={Pictures} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/users" component={Users} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
    

        <Footer />
      </div>
    </div>
  );
}

/*=============================================
FUNCION PARA TENER ACCESO AL TOKEN
=============================================*/

const getAccessToken = () => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const id = localStorage.getItem("ID");
  const userName = localStorage.getItem("USERNAME");

  if (
    !accessToken ||
    accessToken === null ||
    !id ||
    id === null ||
    !userName ||
    userName === null
  ) {
    return false;
  }

  const metaToken = jwtDecode(accessToken);

  if (!metaToken.data) {
    return false;
  }

  if (
    tokenExp(accessToken, metaToken) ||
    metaToken.data._id !== id ||
    metaToken.data.username !== userName
  ) {
    return false;
  } else {
    return true;
  }
};

/*=============================================
FUNCION PARA VERIFICAR EXP DATE TOKEN
=============================================*/

const tokenExp = (accessToken, metaToken) => {
  const seconds = 60;

  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;

  return exp < now;
};