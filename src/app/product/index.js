import React, { useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import './style.css';
import ProductLayout from "../../components/product-layout";
import {useLanguage} from "../../store/context";



function Product() {
  const { id } = useParams();
  const store = useStore();
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    store.actions.product.fetchProductById(id);
  }, [id, store]);

  const select = useSelector(state => ({
    product: state.product.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  if (!select.product) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <Head title={select.product.title} changeLanguage={changeLanguage} />
      <div className="ProductDetail-header">
        <Link to="/">Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>
      <ProductLayout addToBasket={callbacks.addToBasket} select={select} />
    </PageLayout>
  );
}

export default Product;
