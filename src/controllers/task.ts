import { Request, Response } from "express";
import errorCodes from "../error";
import * as services from "../services/task";
import * as validators from "../validators.ts/validator";

export const getById = async (req: Request, res: Response) => {
  try {
    if (!validators.validateAddTask({ title: req.body.title }))
      return res.status(errorCodes.badRequest).send("Request body is Invalid");

    if (!validators.validateId(req.params.id))
      return res.status(errorCodes.badRequest).send("ID is invalid");

    const task = await services.getById(req.params.id);
    if (!task) return res.status(errorCodes.notFound).send("ID not exists");

    return res.status(errorCodes.ok).send(task);
  } catch (error) {
    return res
      .status(errorCodes.internalServerError)
      .send("Internal Server Error");
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const arr = await services.getAll();
    res.status(errorCodes.ok).send(arr);
  } catch (e) {
    res
      .status(errorCodes.internalServerError)
      .send("Not able to fetch data from database");
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    if (!validators.validateAddTask(req.body))
      return res.status(errorCodes.badRequest).send("Request is not valid");

    const result = await services.addTask(req.body.title);

    if (result.acknowledged)
      return res.status(errorCodes.ok).send("Task Added Successfully");

    return res.status(500).send("Error while adding the record");
  } catch (e) {
    return res
      .status(errorCodes.internalServerError)
      .send("Internal Server Error");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    if (!validators.validateAddTask(req.body))
      return res.status(errorCodes.badRequest).send("Request is invalid");

    if (!validators.validateId(req.params.id))
      return res.status(errorCodes.badRequest).send("Id is Invalid");

    const task = await services.getById(req.params.id);
    if (!task) return res.status(errorCodes.notFound).send("ID not exists");

    const result = services.updateTask(
      req.params.id,
      req.body.title,
      req.body.isCompleted
    );
    if (!result)
      return res
        .send(errorCodes.internalServerError)
        .send("Error while updating document");

    return res.status(errorCodes.ok).send("Record Updated Successfully");
  } catch (e) {
    return res
      .status(errorCodes.internalServerError)
      .send("Internal Server Error");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!validators.validateAddTask(req.body))
      return res.status(errorCodes.badRequest).send("Request is invalid");

    if (!validators.validateId(req.params.id))
      return res.send(errorCodes.badRequest).send("Id is invalid");

    const task = await services.getById(req.params.id);
    if (!task) return res.status(errorCodes.notFound).send("Id not exists");

    const result = await services.deleteTask(req.params.id);
    if (!result)
      return res
        .status(errorCodes.internalServerError)
        .send("Error while deleting the document");

    res.status(errorCodes.ok).send("Record deleted successfully");
  } catch (e) {
    return res
      .status(errorCodes.internalServerError)
      .send("Internal Server Error");
  }
};
