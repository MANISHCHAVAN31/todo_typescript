import User from "../models/user.model";
import { loginRequest, registerRequest } from "../types";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/BigPromise";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

export const registerUser = asyncHandler(async (req: registerRequest, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userData = await User.findOne({ username: username.toLowerCase() });
  if (userData) {
    throw new ApiError(400, "Username is already used");
  }

  const existingUser = await User.findOne({ email: email.trim() });

  if (existingUser) {
    throw new ApiError(400, "Email already registered");
  }

  const encPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username: username.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password: encPassword,
  });

  const payload = { _id: user._id };
  const options: jwt.SignOptions = { expiresIn: process.env.TOKEN_EXPIRE };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, options);

  user.password = undefined;

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
    })
    .json(
      new ApiResponse(200, { user, token }, "User registered Successfully")
    );
});

export const loginUser = asyncHandler(async (req: loginRequest, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email.trim() });

  if (!existingUser) {
    throw new ApiError(400, "Email is not registered");
  }

  const payload = { _id: existingUser._id };
  const options: jwt.SignOptions = { expiresIn: process.env.TOKEN_EXPIRE };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, options);

  existingUser.password = undefined;

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
    })
    .json(
      new ApiResponse(
        200,
        { existingUser, token },
        "User logged in Successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});
