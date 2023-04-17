import {ObjectSchema} from 'realm'
export const CommentSchema:ObjectSchema  = {
  name: 'Comment',
  properties: {
    _id: {type: 'string', indexed: true},
    message: 'string',
    status: 'bool',
    ticketId: {type: 'string', indexed: true},
    createdAt: 'date',
  },
  primaryKey: '_id',
};
