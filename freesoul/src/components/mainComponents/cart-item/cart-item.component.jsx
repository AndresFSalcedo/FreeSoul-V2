import React from 'react';

import './cart-item.styles.scss';
import { apiRoute } from "../../../config/Config";


const CartItem = ({ item: { image, price, design, quantity } }) => (
  <div className='cart-item'>
    <img src={`${apiRoute}/show-pictureImg/${image}`} alt='item' />
    <div className='item-details'>
      <span className='name'>{design}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;