import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import { fetchComments, addComment } from '../../store-redux/comments/actions';
import ArticleComments from '../../components/article-comment';
import listToTree from '../../utils/list-to-tree';
import useStoreSelector from '../../hooks/use-selector';

function ArticleCommentsContainer() {
  const dispatch = useDispatch();
  const params = useParams();
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    dispatch(fetchComments(params.id));
  }, [params.id, dispatch]);

  const select = useSelector(
    state => ({
      comments: state.comments.comments,
    }),
    shallowequal,
  );

  const storeSelect = useStoreSelector(
    state => ({
      exists: state.session.exists,
      token: state.session.token,
      user: state.session.user,
    }),
  );

  const handleAddComment = useCallback((text, parentId) => {
    const parent = parentId ? { _id: parentId, _type: 'comment' } : { _id: params.id, _type: 'article' };
    dispatch(addComment({ text, parent, article: params.id, token: storeSelect.token }));
    setReplyTo(null);
  }, [dispatch, params.id, storeSelect.token]);

  const organizedComments = listToTree(select.comments);
  return (
    <ArticleComments
      comments={organizedComments}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      handleAddComment={handleAddComment}
      exists={storeSelect.exists}
      link="/login"
      user={storeSelect.user}
    />
  );
}

export default memo(ArticleCommentsContainer);
