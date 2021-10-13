import React from "react";
import { connect} from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";
import "../../../";
import CheckoutItem from "../../mainComponents/checkout-item/checkout-item.component";

const CheckoutPage = ({ cartItems, total }) => (
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        
        
      </div>
      <div className="col-lg-6">
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
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);