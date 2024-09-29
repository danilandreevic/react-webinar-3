import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import {useNavigate} from "react-router-dom";
import useTranslation from "../../hooks/useTranslations";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const callbacks = {
    onRemove: e => {
      e.stopPropagation();
      props.onRemove(props.item._id)
    },
    onAdd: e => {
      e.stopPropagation();
      props.onAdd(props.item._id);
    },
    onView: e => {
      props.onView(props.link);
      props.closeModal();
    },
  };

  return (
    <div className={cn()} onClick={callbacks.onView}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {t('pcs')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('remove')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};



export default memo(ItemBasket);
