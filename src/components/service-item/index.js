import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function ServiceItem({ item, onAdd }) {
  return (
    <div className="ServiceItem">
      <div className="ServiceItem-first">
        <div className="ServiceItem-code">{item.code}</div>
        <div className="ServiceItem-title">{item.title}</div>
      </div>
<div className="ServiceItem-second">
      <div className="ServiceItem-price">{formatPrice(item.price)} ₽</div>
      <div className="ServiceItem-actions">
        <button onClick={() => onAdd(item.code)}>Добавить</button>
      </div>
</div>
    </div>
  );
}

ServiceItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default React.memo(ServiceItem);
