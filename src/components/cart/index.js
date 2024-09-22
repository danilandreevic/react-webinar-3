// src/components/cart/index.js
import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function Index({ cart, onRemove }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="Cart">
      {cart.map(item => (
        <div key={item.code} className="Cart-item">
          <div className="Cart-item-first">
            <div>{item.code}</div>
            <div>{item.title}</div>
          </div>
          <div className="Cart-item-second">
            <div>{formatPrice(item.price)} ₽</div>
            <div>{item.quantity}</div>
            <button className="Cart-item-button" onClick={() => onRemove(item.code)}>Удалить</button>
          </div>
        </div>
      ))}
      <div className="Cart-footer">
        <div>Итого <span className="Cart-footer__price">{formatPrice(totalPrice)}₽ </span></div>
      </div>
    </div>
  );
}

Index.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Index;
