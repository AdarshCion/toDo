import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";

dotenv.config();

let db: mongodb.Db;

export async function connectToDb(dbName: string) {
  const MONGODB_URI = process.env.URI;

  if (!MONGODB_URI) {
    throw new Error("URL for database is undefined");
  }

  const client = new MongoClient(MONGODB_URI);

  await client.connect();

  db = client.db(dbName);
}

export async function getCollection<T extends mongodb.Document>(
  collectionName: string
) {
  if (!db) throw new Error("Database Not Connected");
  return db.collection<T>(collectionName);
}

export async function createCollection(collectionName: string) {
  if (!db) throw new Error("Database Not Connected");

  if (
    (await db.listCollections().toArray()).filter(
      (val) => val.name === collectionName
    ).length > 0
  )
    return;

  const schema = {
    $jsonSchema: {
      bsonType: "object",
      additionalProperties: false,
      required: ["title"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        title: {
          bsonType: "string",
        },
        isCompleted: {
          bsonType: "Boolean",
        },
      },
    },
  };

  await db.createCollection(collectionName);
  await db.command({ collMod: "tasksToDo", validator: schema });
}
