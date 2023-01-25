import { ObjectId } from "mongodb";
import { connectToDb, getCollection } from "./connectdb";
import { createCollection } from "./connectdb";

export default async function checkId(id: string) {
  await connectToDb("todo");
  await createCollection("tasksToDo");

  if (
    await (await getCollection("tasksToDo")).findOne({ _id: new ObjectId(id) })
  )
    return true;

  return false;
}
