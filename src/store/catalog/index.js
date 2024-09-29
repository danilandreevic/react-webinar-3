import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      limit: 10,
      skip: 0,
      total: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }

  async load(limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
    const json = await response.json();
    const total = json.result.count;
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        limit,
        skip,
        total,
        totalPages,
        currentPage,
      },
      'Загружены товары из АПИ',
    );
  }
}
export default Catalog;
