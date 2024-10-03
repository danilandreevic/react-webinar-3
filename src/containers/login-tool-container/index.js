import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import LoginTool from '../../components/login-tool';

function LoginToolContainer() {
  const [username, setUsername] = useState('');
  const store = useStore();
  const navigate = useNavigate();
  const isLogin = store.getState().login.isLogin;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const user = store.getState().login.user;
      if (user) {
        setUsername(user.username);
      }
    });
    return () => unsubscribe();
  }, [store]);

  useEffect(() => {
    if (isLogin && window.location.pathname === '/login') {
      navigate('/');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (isLogin) {
      store.actions.login.fetchProfile();
    }
  }, [isLogin, store]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    await store.actions.login.logout();
  };

  return (
    <LoginTool isLogin={isLogin} onLogin={handleLogin} onLogout={handleLogout} username={username} />
  );
}

export default LoginToolContainer;
