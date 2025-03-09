import express from "express";

import validateResource from "../middlewares/validateResource";

import auth from "../middlewares/auth";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "../schemas/auth.schemas";
import {
  loginHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";

const router = express.Router();

// Public routes
router.post("/login", validateResource(loginSchema), loginHandler);
router.post(
  "/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);
router.patch(
  "/reset-password/:token",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);
// protected routes
router.post("/logout", auth, , logoutHandler);

export default router;
