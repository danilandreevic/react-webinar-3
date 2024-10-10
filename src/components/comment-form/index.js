import React, { useState } from 'react';
import 'style.css'; // Import the CSS for styling

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form className="CommentForm" onSubmit={handleSubmit}>
      <h4 className="CommentForm-header">Новый комментарий</h4>
      <textarea
        className="CommentForm-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button className="CommentForm-button" type="submit">Отправить</button>
    </form>
  );
};

export default CommentForm;
