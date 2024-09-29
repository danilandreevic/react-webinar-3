import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useTranslation from "../../hooks/useTranslations";

function Item(props) {
  const cn = bem('Item');
  const { t } = useTranslation();

  const callbacks = {
    onAdd: e => {
      e.stopPropagation();
      props.onAdd(props.item._id);
    },
    onView: e => {
      e.stopPropagation();
      props.closeModal();
      props.onView(props.link);
    },
  };

  return (
    <div className={cn()} onClick={callbacks.onView}>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{t('add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  onView: PropTypes.func,
  closeModal: PropTypes.func,
  link: PropTypes.string,
};

export default memo(Item);
