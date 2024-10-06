import StoreModule from '../module';

class LoginState extends StoreModule {
  initState() {
    return {
      user: null,
      token: null,
      isLogin: false,
      error: null,
    };
  }

  initialize() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        token: token,
        isLogin: true,
      });
      this.fetchProfile();
    }
  }

  async restoreSession() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        token: token,
        isLogin: true,
      });
      try {
        await this.fetchProfile();
      } catch (error) {
        console.error('Failed to restore session:', error);
      }
    }
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
        const errorData = await response.json();
        throw new Error(errorData.error.message);
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
        throw new Error('Token not found');
      }

      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          this.setState({
            user: null,
            token: null,
            isLogin: false,
            error: 'Invalid token',
          });
          localStorage.removeItem('token');
        }
        throw new Error(`Profile error! Status: ${response.status}`);
      }

      const data = await response.json();

      this.setState({
        user: data.result,
        token: token,
        isLogin: true,
        error: null,
      });
    } catch (error) {
      this.setState({
        user: null,
        token: null,
        isLogin: false,
        error: error.message,
      });
      localStorage.removeItem('token');
      console.error(`Error loading profile: ${error}`);
    }
  }
}

export default LoginState;
