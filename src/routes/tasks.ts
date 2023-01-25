import dotenv from "dotenv";
import express from "express";
import * as controllers from "../controllers/task";

dotenv.config();

const router = express.Router();

router.get("/:id", controllers.getById);

router.get("/", controllers.getAll);

router.post("/", controllers.addTask);

router.put("/:id", controllers.updateTask);

router.delete("/:id", controllers.deleteTask);

export default router;
