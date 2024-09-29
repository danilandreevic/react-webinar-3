import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, changeLanguage }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ru')}>Русский</button>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  changeLanguage: PropTypes.func.isRequired,
};

export default memo(Head);
