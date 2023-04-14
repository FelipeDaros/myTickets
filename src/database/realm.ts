import Realm from "realm"
import { TicketSchema } from "./TicketSchema"



const getRealm = async () =>
  await Realm.open({
    path: "ticket-1",
    schema: [
      TicketSchema
    ],
    schemaVersion: 4,
  });

export {getRealm};