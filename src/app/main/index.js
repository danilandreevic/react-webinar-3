import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { useLanguage } from '../../store/context';

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const { changeLanguage } = useLanguage();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
  }));

  useEffect(() => {
    const skip = (page - 1) * select.limit;
    store.actions.catalog.load(select.limit, skip);
  }, [store, page, select.limit]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    handlePageChange: useCallback((skip) => {
      const newPage = skip / select.limit + 1;
      setSearchParams({ page: newPage });
    }, [setSearchParams, select.limit]),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onView: useCallback(link => navigate(link), [navigate]),
  };

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          closeModal={callbacks.closeModal}
          onView={callbacks.onView}
          link={`/product/${item._id}`}
        />
      ),
      [callbacks.addToBasket, callbacks.closeModal, callbacks.onView],
    ),
  };

  return (
    <PageLayout>
      <Head title="Название товара" changeLanguage={changeLanguage} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalPages={select.totalPages}
        currentPage={page}
        limit={select.limit}
        skip={select.skip}
        onPageChange={callbacks.handlePageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
