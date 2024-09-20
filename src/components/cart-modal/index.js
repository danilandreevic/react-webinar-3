import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { formatPrice } from '../../utils';
import './style.css';

function CartModal({ cart, onClose, onRemove }) {
  const cn = bem('CartModal');
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={cn('Overlay')} onClick={onClose}></div>
      <div className={cn()}>
        <div className={cn('header')}>
          <h2 className={cn('title')}>Корзина</h2>
          <button className={cn('close-button')} onClick={onClose}>Закрыть</button>
        </div>
        <div className={cn('body')}>
          {cart.map(item => (
            <div key={item.code} className={cn('item')}>
              <div className={cn('item-first')}>
                <div>{item.code}</div>
                <div>{item.title}</div>
              </div>
              <div className={cn('item-second')}>
                <div>{formatPrice(item.price)} ₽</div>
                <div>{item.quantity}</div>
                <button onClick={() => onRemove(item)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
        <div className={cn('footer')}>
          <div>Итого: {formatPrice(totalPrice)} ₽</div>
        </div>
      </div>
    </>
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
