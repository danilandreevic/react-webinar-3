export const organizeComments = (comments) => {
  const commentMap = {};
  comments.forEach(comment => {
    commentMap[comment._id] = { ...comment, children: [] };
  });

  const rootComments = [];
  comments.forEach(comment => {
    if (comment.parent && comment.parent._id) {
      if (commentMap[comment.parent._id]) {
        commentMap[comment.parent._id].children.push(commentMap[comment._id]);
      } else {
        rootComments.push(commentMap[comment._id]);
      }
    } else {
      rootComments.push(commentMap[comment._id]);
    }
  });

  return rootComments;
};
