import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({ credentials, error, onChange, onSubmit }) {
  return (
    <div className="LoginForm-container">
      <h2 className="LoginForm-header">Вход</h2>
      <form className="LoginForm-form" onSubmit={onSubmit}>
        <div>
        <p>Логин</p>
        <input
          name="login"
          value={credentials.login}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          required
        />
        </div>
        <div>
          <p>Пароль</p>
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
          />
        </div>
        {error && <div className="LoginForm__error">{error}</div>}
        <button className="LoginForm-button" type="submit">Войти</button>
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
