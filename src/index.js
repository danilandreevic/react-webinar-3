import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: 1, title: 'Название товара', price:100 },
    { code: 2, title: 'Книга про React', price:770  },
    { code: 3, title: 'Конфета', price:23  },
    { code: 4, title: 'Трактор', price:7955320  },
    { code: 5, title: 'Телефон Iphone XIXV', price:120000  },
    { code: 6, title: 'Карандаши цветные', price:111  },
    { code: 7, title: 'Товар сюрприз', price:0  },
  ],
});
store.initializeList();

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
