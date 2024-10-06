import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const withSessionCheck = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.login.isLogin);

    useEffect(() => {
      if (!isLogin) {
        navigate('/login');
      }
    }, [isLogin, navigate]);

    return isLogin ? <WrappedComponent {...props} /> : null;
  };
};

export default withSessionCheck;
