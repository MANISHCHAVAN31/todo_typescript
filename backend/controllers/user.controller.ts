import User from "../models/user.model";
import { updateUsernameRequest } from "../types";
import { asyncHandler } from "../utils/BigPromise";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  return res.status(200).json(new ApiResponse(200, users, null));
});

export const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  return res.status(200).json(new ApiResponse(200, user, null));
});

export const updateUsername = asyncHandler(
  async (req: updateUsernameRequest, res) => {
    const { username } = req.body;
    const id = req.params.id;

    const existingData = await User.findOne({ username: username });

    if (existingData) {
      throw new ApiError(400, "Username is already taken");
    }
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { username: username },
      { new: true }
    );

    user.password = undefined;
    return res
      .status(200)
      .json(new ApiResponse(200, user, "Username updated successfully"));
  }
);

export const deleteUsername = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.deleteOne({ _id: id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});
