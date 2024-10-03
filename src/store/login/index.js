import StoreModule from '../module';

class LoginState extends StoreModule {
  initState() {
    const token = localStorage.getItem('token');
    return {
      user: null,
      token: token || null,
      isLogin: !!token,
      error: null,
    };
  }
  async login(credentials) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error(`Ошибка логина! Статус: ${response.status}`);
      }
      const data = await response.json();
      this.setState({
        user: data.result,
        token: data.result.token,
        isLogin: true,
        error: null,
      });

      localStorage.setItem('token', data.result.token);

    } catch (error) {
      this.setState({ error: error.message });
      throw error;
    }
  }
  async logout() {
    try {
      const token = this.getState().token || localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден для выхода');
      }
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      this.setState({
        user: null,
        token: null,
        isLogin: false,
        error: null,
      });

      localStorage.removeItem('token');
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  async fetchProfile() {
    try {
      const token = this.getState().token || localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен не найден');
      }

      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка профиля! Статус: ${response.status}`);
      }

      const data = await response.json();

      this.setState({
        user: data.result,
        token: token,
        isLogin: true,
        error: null,
      });
    } catch (error) {
      throw new Error(`Ошибка при загрузке профиля: ${error}`);
    }
  }
}

export default LoginState;
