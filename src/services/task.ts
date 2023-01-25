import { ObjectId } from "mongodb";
import { getCollection } from "../models/connectdb";
import task from "../interface";

export async function getById(id: string) {
  return await (
    await getCollection("tasksToDo")
  ).findOne({
    _id: new ObjectId(id),
  });
}

export async function getAll() {
  return await (await getCollection<task>("tasksToDo")).find().toArray();
}

export async function addTask(title: string) {
  return await (
    await getCollection("tasksToDo")
  ).insertOne({ task: title, isCompleted: false });
}

export async function updateTask(
  id: string,
  title: string,
  isCompleted: boolean
) {
  return await (
    await getCollection("tasksToDo")
  ).updateOne(
    { _id: new ObjectId(id) },
    { $set: { task: title, isCompleted: isCompleted } }
  );
}

export async function deleteTask(id: string) {
  return await (
    await getCollection("tasksToDo")
  ).deleteOne({ _id: new ObjectId(id) });
}
