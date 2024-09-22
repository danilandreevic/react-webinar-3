// src/components/cart-modal/index.js
import React from "react";
import PropTypes from "prop-types";
import Modal from '../modal';
import Cart from '../cart';
import './style.css';

function CartModal({ cart, onClose, onRemove }) {
  return (
    <Modal title="Корзина" onClose={onClose}>
      <Cart cart={cart} onRemove={onRemove} />
    </Modal>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default CartModal;
