import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode'

// Componente Login
import Login from './components/login/Login';

// Componentes Fijos
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';


// Componentes Dinamicos
import Admins from './components/contents/admins/Admins';
import Pictures from './components/contents/pictures/Pictures';
import Slides from './components/contents/slides/Slides';
import Stocks from './components/contents/stocks/Stocks';
import Users from './components/contents/users/Users';
import Error404 from './components/contents/404error/Error404';

export default function App() {

  const auth = getAccessToken();

  if (!auth) {

    return(
      <Login/>
    );
  }

  return (

    <div className="sidebar-mini">
      <div className="wrapper">
        
        <Header/>
        <Sidebar/>

        <BrowserRouter>

          <Switch>
            
            <Route exact path="/admins" component={Admins}/>
            <Route exact path="/slide" component={Slides}/>
            <Route exact path="/pictures" component={Pictures}/>
            <Route exact path="/" component={Stocks}/>
            <Route exact path="/users" component={Users}/>
            <Route component={Error404}/>

          </Switch>

        </BrowserRouter>

        <Footer/>

      </div>
    </div>
  );
}

/*=============================================
FUNCION PARA TENER ACCESO AL TOKEN
=============================================*/

const getAccessToken= ()=>{

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const id = localStorage.getItem("ID");
  const userName = localStorage.getItem("USERNAME");

  if(!accessToken || accessToken === null || 
      !id || id === null ||
      !userName || userName === null){

    return false;
  }

  const metaToken = jwtDecode(accessToken);

  if(!metaToken.data){
    return false;
  }
  
  if(tokenExp(accessToken, metaToken) || metaToken.data._id !== id || metaToken.data.username !== userName){

    return false;
  }else{

    return true;
  }
}

/*=============================================
FUNCION PARA VERIFICAR EXP DATE TOKEN
=============================================*/

const tokenExp = (accessToken, metaToken)=>{

  const seconds = 60;

  const { exp } = metaToken;
  const now = (Date.now()+seconds)/1000;

  return exp < now;
}

