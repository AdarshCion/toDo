import express, { Express } from "express";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";
import { connectToDb, createCollection } from "./models/connectdb";
import cors from "cors";

dotenv.config();

(async () => {
  await connectToDb("todo");
  await createCollection("tasksToDo");

  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  app.use("/", tasksRouter);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})();
