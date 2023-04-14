export const CommentSchema = {
  name: 'Comment',
  properties: {
    _id: 'string',
    message: 'string',
    description: 'string',
    status: 'string',
    createdAt: 'date',
  },
  primaryKey: '_id',
};
