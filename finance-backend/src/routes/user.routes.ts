import express from "express";
import {
  deleteUserHandler,
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/user.schemas";
import auth from "../middlewares/auth";

const router = express.Router();

// Public routes
router.post("/signup", validateResource(createUserSchema), createUserHandler);

// Protected routes - require authentication
router.get("/", auth, getAllUsersHandler);
router.get("/:id", auth, getUserByIdHandler);
router.patch("/:id", auth, updateUserHandler);
router.delete("/:id", auth, deleteUserHandler);

export default router;
