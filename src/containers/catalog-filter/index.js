import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import useSelector from "../../hooks/use-selector";

function CatalogFilter() {
  const store = useStore();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    store.actions.catalog.fetchCategories().then(fetchedCategories => {
      const categoryMap = {};
      fetchedCategories.forEach(category => {
        categoryMap[category._id] = { ...category, children: [] };
      });

      fetchedCategories.forEach(category => {
        if (category.parent) {
          categoryMap[category.parent._id].children.push(categoryMap[category._id]);
        }
      });

      const topLevelCategories = fetchedCategories.filter(category => !category.parent);
      setCategories(topLevelCategories.map(category => categoryMap[category._id]));
    });

    store.actions.catalog.initParams();
  }, [store]);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => {
      store.actions.catalog.resetParams();
    }, [store]),
    onCategoryChange: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    categories: useMemo(() => {
      const formatCategories = (categories, prefix = '') => {
        return categories.flatMap(category => [
          { value: category._id, title: `${prefix}${category.title}` },
          ...formatCategories(category.children, `${prefix} - `),
        ]);
      };
      return [{ value: '', title: 'Все' }, ...formatCategories(categories)];
    }, [categories]),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategoryChange} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
        width="300px"
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
