import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasket(_id) {
    let sum = 0;
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true;
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге
      let item = this.store.getState().catalog.list.find(item => item._id === _id);

      if (!item) {
        // Если товар не найден, делаем запрос к API
        this.store.actions.product.fetchProductById(_id).then(fetchedItem => {
          if (fetchedItem) {
            const updatedList = [...list, { ...fetchedItem, amount: 1 }];
            const updatedSum = sum + fetchedItem.price;
            this.setState(
              {
                ...this.getState(),
                list: updatedList,
                sum: updatedSum,
                amount: updatedList.length,
              },
              'Добавление в корзину',
            );
          }
        });
      } else {
        const updatedList = [...list, { ...item, amount: 1 }];
        const updatedSum = sum + item.price;
        this.setState(
          {
            ...this.getState(),
            list: updatedList,
            sum: updatedSum,
            amount: updatedList.length,
          },
          'Добавление в корзину',
        );
      }
    } else {
      this.setState(
        {
          ...this.getState(),
          list,
          sum,
          amount: list.length,
        },
        'Добавление в корзину',
      );
    }
  }
  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default Basket;
