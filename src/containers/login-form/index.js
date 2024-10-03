import { useNavigate } from 'react-router-dom';
import { memo, useState, useEffect  } from 'react';
import useStore from '../../hooks/use-store';
import LoginForm from '../../components/login-form';

function LoginFormContainer() {
  const store = useStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState(null);
  const [loginState, setLoginState] = useState(false);

  const handleChange = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await store.actions.login.login(credentials);
      await store.actions.login.fetchProfile();
      setLoginState(true);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      setLoginState(false);
    }
  };

  useEffect(() => {
    if (loginState) {
      navigate('/');
    }
  }, [loginState, navigate]);

  return (
    <LoginForm
      credentials={credentials}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default memo(LoginFormContainer);
