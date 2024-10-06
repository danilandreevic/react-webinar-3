import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      profile: null,
      error: null,
    };
  }

  async fetchProfile(userId) {
    try {
      const response = await fetch(`/api/v1/users/${userId}?fields=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Profile fetch error! Status: ${response.status}`);
      }

      const data = await response.json();

      this.setState({
        profile: data.result,
        error: null,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
}

export default ProfileState;
