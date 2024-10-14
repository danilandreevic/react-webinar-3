import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import useStoreSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import { fetchComments, addComment } from '../../store-redux/comments/actions';
import ArticleComments from '../../components/article-comment';
import listToTree from '../../utils/list-to-tree';

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();
  const [replyTo, setReplyTo] = useState(null);

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(fetchComments(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.comments,
    }),
    shallowequal,
  );
  const storeSelect = useStoreSelector(
    state => ({
      exists: state.session.exists,
      token: state.session.token
    }),
  )
  const { t } = useTranslate();

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    handleAddComment: useCallback((text, parentId) => {
      const parent = parentId ? { _id: parentId, _type: 'comment' } : { _id: params.id, _type: 'article' };
      dispatch(addComment({ text, parent, article: params.id, token: storeSelect.token }));
      setReplyTo(null);
    }, [dispatch, params.id]),
    setReplyTo,
  };
  const organizedComments = listToTree(select.comments);
  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <ArticleComments
          comments={organizedComments}
          replyTo={replyTo}
          setReplyTo={callbacks.setReplyTo}
          handleAddComment={callbacks.handleAddComment}
          exists={storeSelect.exists}
          link="/login"
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
