import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function pluralize(count, one, two, five) {
    if (count % 10 === 1 && count % 100 !== 11) {
      return one;
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      return two;
    } else {
      return five;
    }
  }
  function handleDeleteClick(event, code) {
    event.stopPropagation();
    store.deleteItem(code);
  }
  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}
                  {item.selectionCount > 0 && (
                    <span> Выделяли {item.selectionCount} {pluralize(item.selectionCount, 'раз', 'раза', 'раз')}</span>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={(event) => handleDeleteClick(event, item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
