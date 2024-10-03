import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({ credentials, error, onChange, onSubmit }) {
  return (
    <div className="LoginForm-container">
      <h2 className="LoginFomr-header">Вход</h2>
    <form  className="LoginForm-form" onSubmit={onSubmit}>
      <input
        name="login"
        value={credentials.login}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        placeholder="Логин"
        required
      />
      <input
        name="password"
        type="password"
        value={credentials.password}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        placeholder="Пароль"
        required
      />
      {error && <div className="LoginForm__error">{error}</div>}
      <button type="submit">Войти</button>
    </form>
    </div>
  );
}

LoginForm.propTypes = {
  credentials: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default memo(LoginForm);
