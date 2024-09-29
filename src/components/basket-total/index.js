import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import useTranslation from "../../hooks/useTranslations";

function BasketTotal({ sum = 0 }) {
  const cn = bem('BasketTotal');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{t('total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};


export default memo(BasketTotal);
