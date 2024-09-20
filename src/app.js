import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addHandler = useCallback((item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.code === item.code);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.code === item.code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeHandler = useCallback((item) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.code !== item.code));
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls itemCart={totalItems} price={totalPrice} onOpenCart={() => setIsCartOpen(true)} />
      <List list={list} onAdd={addHandler} />
      {isCartOpen && <CartModal cart={cart} onClose={() => setIsCartOpen(false)} onRemove={removeHandler} />}
    </PageLayout>
  );
}

export default App;
