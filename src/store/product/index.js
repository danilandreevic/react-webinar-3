import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      product: null,
      loading: false,
      error: null,
    };
  }

  async fetchProductById(id) {
    this.setState({...this.getState(), loading: true, error: null}, 'Fetching product by ID');
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({...this.getState(), product: json.result, loading: false}, 'Product fetched by ID');
      return json.result;
    } catch (error) {
      this.setState({...this.getState(), loading: false, error: error.toString()}, 'Error fetching product by ID');
      return null;
    }
  }
}

export default Product;
