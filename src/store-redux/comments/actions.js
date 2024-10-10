import Services from '../../services';
const services = new Services({ api: { baseUrl: 'api/v1/' } });

export const fetchCommentsStart = () => ({ type: 'comments/fetchCommentsStart' });
export const fetchCommentsSuccess = (comments) => ({ type: 'comments/fetchCommentsSuccess', payload: comments });
export const fetchCommentsFailure = () => ({ type: 'comments/fetchCommentsFailure' });

export const fetchComments = (articleId) => async (dispatch) => {
  dispatch(fetchCommentsStart());
  try {
    const response = await services.api.request({
      url: `/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`,
      method: 'GET'
    });
    dispatch(fetchCommentsSuccess(response.data.result.items));
  } catch (error) {
    dispatch(fetchCommentsFailure());
  }
};

export const addCommentSuccess = (comment) => ({ type: 'comments/addCommentSuccess', payload: comment });

export const addComment = ({ text, parent, article, token }) => async (dispatch) => {
  try {
    const response = await services.api.request({
      url: '/comments',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
      body: JSON.stringify({ text, parent, article }),
    });
    dispatch(addCommentSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};
