import React from 'react';
import { connect } from 'react-redux';
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

import { toggleCartHidden } from '../../redux/cart/cart.actions';

// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {BiShoppingBag} from 'react-icons/bi';


import './cart-icon.styles.scss';
// import CartItem from '../cart-item/cart-item.component';

const CartIcon = ({toggleCartHidden, itemCount}) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <BiShoppingBag className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state)
});

// const mapStateToProps = ({cart: {cartItems} }) => ({
//   itemCount: cartItems.reduce((accumulatedQuantity, cartItem) =>accumulatedQuantity + cartItem.quantity, 0)
// })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);