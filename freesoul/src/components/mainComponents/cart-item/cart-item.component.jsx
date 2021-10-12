import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { image, price, design, quantity } }) => (
  <div className='cart-item'>
    <img src={image} alt='item' />
    <div className='item-details'>
      <span className='name'>{design}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;