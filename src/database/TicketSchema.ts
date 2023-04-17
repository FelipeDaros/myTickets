export const TicketSchema = {
  name: 'Ticket',
  properties: {
    _id: {type: 'string', indexed: true},
    title: 'string',
    description: 'string',
    status: 'string',
    createdAt: 'date'
  },
  primaryKey: '_id',
};
