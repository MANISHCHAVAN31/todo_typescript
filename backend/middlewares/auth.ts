import User from "../models/user.model";
import { asyncHandler } from "../utils/BigPromise";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token: string | null =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as { _id: string };

  const user = await User.findById(decodedToken._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
  next();
});
