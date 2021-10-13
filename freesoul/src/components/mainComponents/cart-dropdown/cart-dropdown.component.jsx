import React from 'react';

// import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

const CartDropdown = ({ cartItems, setSelected }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length ? (
        cartItems.map(cartItem => <CartItem key={cartItem.productCode} item={cartItem} />)
        ) : (
        <span className='empty-message'>Tu carrito está vacío</span>
        )}
    </div>
    <button className="btn btn-primary" onClick={()=>setSelected('Tu Reserva')}>IR A RESERVA</button>
  </div>
);


const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));