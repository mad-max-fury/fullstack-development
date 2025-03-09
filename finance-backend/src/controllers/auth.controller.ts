import { Request, Response } from "express";
import catchAsync from "../utils/error.utils";
import {
  generateVerificationCode,
  loginUser,
  resetPassword,
} from "../services/auth.service";
import { AUTH_MESSAGES, STATUS_MESSAGES } from "../constants/responseMessages";
import { HttpStatus } from "../utils/enums/errors.enum";

// Login user
export const loginHandler = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } = await loginUser(
    email.toLowerCase(),
    password
  );

  res.status(HttpStatus.OK).json({
    status: STATUS_MESSAGES.SUCCESS,
    message: AUTH_MESSAGES.LOGIN_SUCCESS,
    data: { user, accessToken, refreshToken },
  });
});

// Generate verification code
export const generateVerificationCodeHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const verificationCode = await generateVerificationCode(
      email.toLowerCase()
    );

    res.status(HttpStatus.OK).json({
      status: STATUS_MESSAGES.SUCCESS,
      message: AUTH_MESSAGES.VERIFICATION_CODE_SENT,
      data: { verificationCode },
    });
  }
);

// Reset password
export const resetPasswordHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email, newPassword, verificationCode } = req.body;

    await resetPassword(email.toLowerCase(), newPassword, verificationCode);

    res.status(HttpStatus.OK).json({
      status: STATUS_MESSAGES.SUCCESS,
      message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
    });
  }
);
