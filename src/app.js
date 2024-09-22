// src/app.js
import React, { useCallback, useState, useEffect } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";

function App({ store }) {
  const list = store.getState().list;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(store.getState().cart || []);
  const [totalItems, setTotalItems] = useState(store.getState().totalItems || 0);
  const [totalPrice, setTotalPrice] = useState(store.getState().totalPrice || 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCart(store.getState().cart || []);
      setTotalItems(store.getState().totalItems || 0);
      setTotalPrice(store.getState().totalPrice || 0);
    });
    return () => unsubscribe();
  }, [store]);

  const addHandler = useCallback((code) => {
    store.addItemToCart(code);
  }, [store]);

  const removeHandler = useCallback((code) => {
    store.removeItemFromCart(code);
  }, [store]);

  const uniqueItemsCount = cart.length;

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls itemCart={totalItems} uniqueItemsCount={uniqueItemsCount} price={totalPrice} onOpenCart={() => setIsCartOpen(true)} />
      <List list={list} onAdd={addHandler} />
      {isCartOpen && <CartModal cart={cart} onClose={() => setIsCartOpen(false)} onRemove={removeHandler} />}
    </PageLayout>
  );
}

export default App;
