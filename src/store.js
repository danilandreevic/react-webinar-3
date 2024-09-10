/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const initializedList = initState.list.map(item => ({
      ...item,
      selectionCount: item.selectionCount || 0
    }));

    this.state = { ...initState, list: initializedList };
    this.listeners = []; // Слушатели изменений состояния

    this.currentCode = initializedList.length > 0
      ? Math.max(...initializedList.map(item => item.code))
      : 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  generateNextCode() {
    return ++this.currentCode;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateNextCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selectionCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */

  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            selectionCount: item.selected ? item.selectionCount : item.selectionCount + 1
          };
        }
        return {
          ...item,
          selected: false
        };
      }),
    });
  }
}

export default Store;
