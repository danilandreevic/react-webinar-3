import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
function LoginTool({ isLogin = false, onLogin = {}, onLogout = {}, username ='' }) {
  const handleLogoutClick = (e) => {
    e.stopPropagation();
    onLogout();
  };

  return (
    <div className="LoginTool">
      {isLogin ? (
        <>
          <Link className="LoginTool-link" to="/profile">{username}</Link>
          <button onClick={handleLogoutClick}>Выход</button>
        </>
      ) : (
        <button onClick={onLogin}>Вход</button>
      )}
    </div>
  );
}

export default LoginTool;
