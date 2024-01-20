import Todo from "../models/todo.model";
import { createTodoRequest } from "../types";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/BigPromise";

export const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  return res.status(200).json(new ApiResponse(200, todos, ""));
});

export const createTodo = asyncHandler(async (req: createTodoRequest, res) => {
  const { title, isDeleted, expiryDate } = req.body;

  if (!title) {
    throw new ApiError(400, "Incomplete information");
  }

  const newTodo = await Todo.create({
    title: title,
    is_deleted: isDeleted,
    expiry_date: expiryDate,
    created_by: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, newTodo, "Todo created successfully"));
});

export const updateTodo = asyncHandler(async (req, res) => {
  const { title, isDeleted } = req.body;
  const id = req.params.id;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  let updatedTodo = await Todo.findByIdAndUpdate(
    { _id: id },
    { title: title, is_deleted: isDeleted },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Todo updated successfully"));
});

export const softDeleteTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndUpdate(
    { _id: id },
    { is_deleted: true },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Todo deleted successfully"));
});

export const hardDeleteTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Todo.deleteOne({ _id: id });
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Todo deleted successfully"));
});
