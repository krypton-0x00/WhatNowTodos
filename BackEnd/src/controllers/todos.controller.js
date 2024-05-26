import { Todo } from "../models/todos.model.js";

export async function addTodo(req, res) {
  try {
    const { title, description } = req.body;
    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message: "All fields Are required",
      });
    }

    const newtodo = await new Todo({ title, description });
    res.status(201).json({
      success: true,
    });
    console.log(newtodo);
    newtodo.save();
  } catch (error) {
    console.log("ERROR:", error);
  }
}
export async function getTodo(req, res) {
  try {
    const todos = await Todo.find({});

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ success: false });
    console.log("Error:", error);
  }
}
export async function deleteTodo(req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo does not exist" });
    }
    res.status(200).json({
      success: true,
      deletedTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false });
    console.log("Error:", error);
  }
}
export async function updateTodo(req, res) {
  try {
    const { id, title, description, isCompleted } = req.body;
    const filter = { _id: id };
    const update = { title, description, isCompleted };
    const updatetodo = await Todo.findByIdAndUpdate(filter, update);
    if (!updatetodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo does not exist" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
    console.log("Error:", error);
  }
}
