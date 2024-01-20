import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import { isLoggedIn } from "../middlewares/auth";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isLoggedIn, logoutUser);

export default router;
