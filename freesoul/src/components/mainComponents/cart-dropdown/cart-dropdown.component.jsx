import React from 'react';

// import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton.component';

const CartDropdown = ({ cartItems, history }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length ? (
        cartItems.map(cartItem => <CartItem key={cartItem.productCode} item={cartItem} />)
        ) : (
        <span className='empty-message'>Tu carrito está vacío</span>
        )}
    </div>
    <Link to="/checkout" className="btn btn-primary">ir a reserva</Link>
  </div>
);


const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));