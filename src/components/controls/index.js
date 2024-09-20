import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatPrice, plural} from "../../utils";

function Controls({ itemCart = 0, price = 0, onOpenCart }) {
  return (
    <div className="Controls">
      <div className="Controls-cart">
        В корзине: <span className="Controls-cart__bold">{itemCart === 0 ? 'пусто' : `${itemCart} ${plural(itemCart, {
        one: 'товар', few: 'товара', many: 'товаров',
      })} / ${formatPrice(price)} ₽`}</span>
      </div>
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  itemCart: PropTypes.number,
  price: PropTypes.number,
  onOpenCart: PropTypes.func.isRequired
};

export default React.memo(Controls);
