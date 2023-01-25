import { ObjectId } from "mongodb";

export default interface Task {
  _id: ObjectId;
  title: string;
  isCompleted: boolean;
}
