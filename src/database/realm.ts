import Realm from "realm"
import { TicketSchema } from "./TicketSchema"
import { CommentSchema } from "./CommentSchema";



const getRealm = async () =>
  await Realm.open({
    path: "ticket-5",
    schema: [
      TicketSchema,
      CommentSchema
    ],
    schemaVersion: 7,
  });

export {getRealm};