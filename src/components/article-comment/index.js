import React, { useRef, useEffect } from 'react';
import CommentForm from '../comment-form/index';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

const ArticleComments = ({ comments, replyTo, setReplyTo, handleAddComment, exists, link,user }) => {
  const cn = bem('ArticleComments');
  const maxDepth = 3;
  const replyFormRef = useRef(null);
  useEffect(() => {
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [replyTo]);
  const renderComment = (comment) => (
    <li key={comment._id} className={cn('item', { child: comment.parent && comment.depth <= maxDepth })}>
      <div className={cn('content')}>
        <p className={cn('author')}>
     <span className={comment.author?.profile?.name === user?.profile?.name ? cn('author-name') : ''}>
  {comment.author?.profile?.name || 'Unknown Author'}
</span>
          <span className={cn('date')}>
          {new Date(comment.dateCreate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}{' '}
            в{' '}
            {new Date(comment.dateCreate).toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </span>
        </p>
        <p className={cn('text')}>{comment.text}</p>
        <button
          className={cn('reply-button')}
          onClick={() => setReplyTo(comment._id)}
        >
          Ответить
        </button>
      </div>
      {comment.children && (
        <ul className={cn('list')}>
          {comment.children.map(renderComment)}
          {replyTo === comment._id && (
            exists ? (
              <div ref={replyFormRef}>
                <CommentForm onSubmit={(text) => handleAddComment(text, comment._id)} onCancel={() => setReplyTo(null)} />
              </div>
            ) : (
              <div className={cn('login')} ref={replyFormRef}>
                <Link className={cn('link-login')} to={link}>Войдите</Link>, чтобы иметь возможность комментировать.
                <button className={cn('button-cancel')} onClick={() => setReplyTo(null)}>Отмена</button>
              </div>
            )
          )}
        </ul>
      )}
    </li>
  );

  return (
    <div className={cn()}>
      <h3>Комментарии {`(${comments.length})`}</h3>
      <ul className={cn('list')}>{comments.map(renderComment)}</ul>
      {exists ? (
        <div className={cn('new-comment-form')}>
          <CommentForm onSubmit={(text) => handleAddComment(text)}/>
        </div>
      ) : (
        <div className={cn('link')}>
          <Link className={cn('link-login')} to={link}>Войдите</Link>, чтобы иметь возможность комментировать.
        </div>
      )}
    </div>
  );
};

export default ArticleComments;
