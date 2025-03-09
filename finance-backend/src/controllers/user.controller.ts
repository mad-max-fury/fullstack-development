import { Response, Request } from "express";
import {
  createUser,
  findOneUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../services/user.service";
import { CreateUserInputSchema } from "../schemas/user.schemas";
import catchAsync from "../utils/error.utils";
import AppError from "../errors/appError";
import { User } from "../models/user.model";

// Create User
export const createUserHandler = catchAsync(
  async (req: Request<{}, {}, CreateUserInputSchema>, res: Response) => {
    const body = req.body;
    body.email = body.email.toLowerCase();

    // Check if the user already exists
    const existingUser = await findOneUser({ email: body.email });
    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    // Create a new user
    await createUser(body);

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  }
);
// get all users
export const getAllUsersHandler = catchAsync(
  async (req: Request, res: Response) => {
    const users = await getAllUsers();

    if (!users || users.length === 0) {
      throw new AppError("No users found", 404);
    }

    return res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: users.map((user) => user.toJSON()),
    });
  }
);

// Get User by ID
export const getUserByIdHandler = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    // Find the user by ID
    const user = await getUserById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: user.toJSON(),
    });
  }
);

// Update User
export const updateUserHandler = catchAsync(
  async (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    // Update the user with the given ID
    const updatedUser = await updateUser({ _id: id }, updates);

    if (!updatedUser) {
      throw new AppError("User not found or update failed", 404);
    }

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser.toJSON(),
    });
  }
);

// Delete User
export const deleteUserHandler = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    // Delete the user with the given ID
    const deletedUser = await deleteUser({ _id: id });

    if (!deletedUser) {
      throw new AppError("User not found or deletion failed", 404);
    }

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  }
);
