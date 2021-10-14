import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import Swal from 'sweetalert2';
import {apiRoute} from '../../../config/Config';

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";
import CheckoutItem from "../../mainComponents/checkout-item/checkout-item.component";



const CheckoutPage = ({ cartItems, total }) => {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cc, setCC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  async function SubmitForm(){

    if(name === '' || lastName === '' || cc === '' || phone === '' || email === '' || city === '' || address === '' || total === '' || cartItems === ''){
      return(
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Algun campo se encuentra vacio`
        })
      )
    }

    let reserve = {
      name: name,
      lastName: lastName,
      cC: parseInt(cc),
      phone: parseInt(phone),
      email: email,
      city: city,
      address: address,
      totalCost: total,
      products: cartItems
    }

    const result = await postReserve(reserve)

    if(result.status === 400){

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${result.msg}`
      })
    }

    if(result.status === 200){

      Swal.fire({
        icon: 'success',
        title: 'Felicitaciones!',
        text: `Tu reserva ha sido creada con exito`
      })

      setTimeout(()=>{window.location.href = "/"},4000)

      //Envio de correos
    }

  };

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-5 mt-5">        
          <Form>
            <Row className="mb-4">
              <Form.Group as={Col} >
                <Form.Label>Nombre</Form.Label>
                <Form.Control  type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu apellido" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} >
                <Form.Label>Cecula de Ciudadania</Form.Label>
                <Form.Control type="number" placeholder="Ingresa el numero de cedula" value={cc} onChange={(e)=>{setCC(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="number" placeholder="Ingresa numero de contacto" value={phone} onChange={(e)=>{setPhone(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Ciudad</Form.Label>
                <Form.Control type="text"  placeholder="Ingresa tu ciudad" value={city} onChange={(e)=>{setCity(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Direccion</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu direccion" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" onClick={()=>{SubmitForm()}}>
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-lg-7">
          <div className="checkout-page">
            <div className="checkout-header">
              <div className="header-block">
                <span>Product</span>
              </div>
              <div className="header-block">
                <span>Description</span>
              </div>
              <div className="header-block">
                <span>Quantity</span>
              </div>
              <div className="header-block">
                <span>Price</span>
              </div>
              <div className="header-block">
                <span>Remove</span>
              </div>
            </div>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.productCode} cartItem={cartItem} />
            ))}

            <div className="total">
              <span>TOTAL: ${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

/*=============================================
PETICION POST
=============================================*/

const postReserve = data =>{

  const url = `${apiRoute}/create-clientReserve`
  const params = {

    method: "POST",
    body: JSON.stringify(data),
    headers: {

      "Content-Type": "application/json"
    }

  }

  return fetch(url, params).then(response =>{

    return response.json()
  }).then(result =>{

    return result
  }).catch(err =>{

    return err
  })
}


const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);