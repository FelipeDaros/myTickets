export const TicketSchema = {
  name: 'ticket',
    properties: {
      _id: 'string',
      title: 'string',
      description: 'string',
      status: 'string',
      createdAt: 'date'
    },
    primaryKey: '_id'
}