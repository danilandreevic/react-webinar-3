import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function ProductItem({ item, onAdd }) {
  return (
    <div className="ProductItem">
      <div className="ProductItem-first">
        <div className="ProductItem-code">{item.code}</div>
        <div className="ProductItem-title">{item.title}</div>
      </div>
      <div className="ProductItem-second">
        <div className="ProductItem-price">{formatPrice(item.price)} ₽</div>
        <div className="ProductItem-actions">
          <button onClick={() => onAdd(item.code)}>Добавить</button>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default React.memo(ProductItem);
