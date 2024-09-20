import React from 'react';
import Item from '../item';

function List({ list, onAdd }) {
  return (
    <div className="List">
      {list.map(item => (
        <Item key={item.code} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default List;
