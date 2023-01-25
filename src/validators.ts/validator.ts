import { ObjectId } from "mongodb";

export function validateAddTask(body: { title: string }) {
  return !!body.title.trim().length;
}

export function validateId(id: string) {
  return ObjectId.isValid(id);
}
