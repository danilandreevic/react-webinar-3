import React from 'react';
import './style.css';
import {numberFormat} from "../../utils";
import useTranslation from "../../hooks/useTranslations";



const ProductLayout = ({select, addToBasket}) => {
  const { t } = useTranslation();

  const callbacks = {
    onAdd: () => {
      addToBasket(select.product._id);
    },
  };

  return (
    <div className="ProductDetail-content">
      <p>{select.product.description}</p>
      <p>{t('countryOfOrigin')}: <span className="ProductDetail-content__black">{select.product.madeIn.title}</span></p>
      <p>{t('category')}: <span className="ProductDetail-content__black">{select.product.category.title}</span></p>
      <p>{t('yearOfRelease')}: <span className="ProductDetail-content__black">{select.product.edition}</span></p>
      <h3>{t('price')}: {numberFormat(select.product.price)} ₽</h3>
      <button onClick={callbacks.onAdd}>{t('add')}</button>
    </div>
  );
};

export default ProductLayout;
