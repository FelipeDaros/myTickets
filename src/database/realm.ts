import Realm from "realm"
import { TicketSchema } from "./TicketSchema"



const getRealm = async () =>
  await Realm.open({
    path: "maxipas-app",
    schema: [
      TicketSchema
    ],
    schemaVersion: 2,
  });

export {getRealm};