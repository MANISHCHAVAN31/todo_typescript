import express from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
  deleteUsername,
  getAllUsers,
  getUserById,
  updateUsername,
} from "../controllers/user.controller";
const router = express.Router();

router.get("/", isLoggedIn, getAllUsers);
router.get("/:id", isLoggedIn, getUserById);
router.put("/username/:id", isLoggedIn, updateUsername);
router.delete("/:id", isLoggedIn, deleteUsername);

export default router;
