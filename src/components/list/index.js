import React from "react";
import PropTypes from "prop-types";
import ProductItem from "../product-item";
import ServiceItem from "../service-item";
import './style.css';

function List({ list, onAdd }) {
  return (
    <div className="List">
      {list.map(item => {
        if (item.type === 'product') {
          return <ProductItem key={item.code} item={item} onAdd={onAdd} />;
        } else if (item.type === 'service') {
          return <ServiceItem key={item.code} item={item} onAdd={onAdd} />;
        }
        console.warn(`Unknown item type: ${item.type}`);
        return null;
      })}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default React.memo(List);
