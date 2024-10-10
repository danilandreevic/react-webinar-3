const initialState = {
  comments: [],
  loading: false,
  error: null
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'comments/fetchCommentsStart':
      return { ...state, loading: true, error: null };
    case 'comments/fetchCommentsSuccess':
      return { ...state, loading: false, comments: action.payload };
    case 'comments/fetchCommentsFailure':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default commentsReducer;
