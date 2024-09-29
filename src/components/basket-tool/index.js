import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import useTranslation from "../../hooks/useTranslations";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { t } = useTranslation();
  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('inCart')}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
              one: `${t('one')}`,
              few: `${t('few')}`,
              many: `${t('many')}`,
            })} / ${numberFormat(sum)} ₽`
          : `${t('empty')}`}
      </span>
      <button onClick={onOpen}>{t('toCart')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};



export default memo(BasketTool);
