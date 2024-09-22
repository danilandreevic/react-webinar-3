import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Название товара', type: 'service', price:100 },
    { code: 2, title: 'Книга про React', type: 'product', price:770  },
    { code: 3, title: 'Конфета', type: 'product', price:23  },
    { code: 4, title: 'Трактор', type: 'product', price:7955320  },
    { code: 5, title: 'Телефон Iphone XIXV', type: 'product', price:120000  },
    { code: 6, title: 'Карандаши цветные', type: 'product', price:111  },
    { code: 7, title: 'Товар сюрприз',  type: 'product',price:0  },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
