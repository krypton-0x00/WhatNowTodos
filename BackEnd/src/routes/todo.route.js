import express from "express";
import {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controller.js";

const todoRouter = express.Router();

todoRouter.get("/", getTodo);
todoRouter.post("/", addTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.patch("/", updateTodo);
export default todoRouter;
