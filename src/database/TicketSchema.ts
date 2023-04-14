export const TicketSchema = {
  name: 'Ticket',
  properties: {
    _id: 'string',
    title: 'string',
    description: 'string',
    status: 'string',
    createdAt: 'date',
    comments: 'Comment[]?'
  },
  primaryKey: '_id',
};
