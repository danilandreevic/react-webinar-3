// src/components/modal/index.js
import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ title, children, onClose }) {
  const cn = bem('Modal');

  return (
    <>
      <div className={cn('Overlay')} onClick={onClose}></div>
      <div className={cn()}>
        <div className={cn('header')}>
          <h2 className={cn('title')}>{title}</h2>
          <button className={cn('close-button')} onClick={onClose}>Закрыть</button>
        </div>
        <div className={cn('body')}>
          {children}
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
