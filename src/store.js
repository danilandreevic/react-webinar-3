// src/store.js

class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      cart: initState.cart || [],
      totalItems: 0,
      totalPrice: 0,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (!item) return;

    const cart = this.state.cart;
    const existingItem = cart.find(cartItem => cartItem.code === code);
    const newCart = existingItem
      ? cart.map(cartItem =>
        cartItem.code === code
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      : [...cart, { ...item, quantity: 1 }];

    const totalItems = newCart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const totalPrice = newCart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);

    this.setState({ ...this.state, cart: newCart, totalItems, totalPrice });
  }

  removeItemFromCart(code) {
    const cart = this.state.cart;
    const newCart = cart.filter(cartItem => cartItem.code !== code);

    const totalItems = newCart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const totalPrice = newCart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);

    this.setState({ ...this.state, cart: newCart, totalItems, totalPrice });
  }
}

export default Store;
