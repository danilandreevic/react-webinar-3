import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatPrice} from "../../utils";

function Item({ item, onAdd }) {
  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{formatPrice(item.price)} ₽</div>
      <div className="Item-actions">
        <button onClick={() => onAdd(item)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default React.memo(Item);
