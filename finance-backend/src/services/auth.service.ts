import UserModel from "../models/user.model";
import AppError from "../errors/appError";
import config from "config";
import argon2 from "argon2";
import { ERROR_MESSAGES } from "../constants/responseMessages";
import { signToken, sendEmail } from "../utils/helpers.utils";
import { HttpStatus } from "../utils/enums/errors.enum";

// Login user
export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED
    );
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED
    );
  }
  const accessToken = signToken(user.id, config.get<string>("jwtExpiresIn"));
  const refreshToken = signToken(
    user.id,
    config.get<string>("jwtRefreshExpiresIn")
  );
  return { user: user.toJson(), accessToken, refreshToken };
};

// Logout user
export const logoutUser = async (userId: string) => {
  // In a real implementation, you might want to:
  // 1. Add the token to a blacklist
  // 2. Update the user's last activity timestamp
  // 3. Clear any related sessions

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  // Update last activity timestamp
  user.lastActivity = new Date();
  await user.save();

  return true;
};

// Forget password flow - Step 1: Request password reset
export const requestPasswordReset = async (email: string) => {
  // 1. Verify user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  // 2. Generate and store OTP token
  const otpToken = Math.random().toString(36).substring(2, 8).toUpperCase();
  user.resetPasswordToken = otpToken;
  user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  await user.save();

  // 3. Send OTP token to user's email
  const emailSubject = "Password Reset Request";
  const emailBody = `
    Hello ${user.name || user.email},
    
    You requested to reset your password. Use the following OTP code to verify your identity:
    
    ${otpToken}
    
    This code will expire in 30 minutes.
    
    If you didn't request this, please ignore this email or contact support if you have concerns.
  `;

  await sendEmail(email, emailSubject, emailBody);

  return true;
};

// Forget password flow - Step 2: Verify OTP and provide temporary password
export const verifyOTPAndGetTempPassword = async (
  email: string,
  otpToken: string
) => {
  // 1. Find user with matching email and OTP token
  const user = await UserModel.findOne({
    email,
    resetPasswordToken: otpToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
      HttpStatus.BAD_REQUEST
    );
  }

  // 2. Generate temporary password
  const tempPassword = Math.random().toString(36).substring(2, 10);
  const hashedTempPassword = await argon2.hash(tempPassword);

  // 3. Save temporary password and clear OTP
  user.password = hashedTempPassword;
  user.tempPasswordFlag = true; // Add this field to user model
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  // 4. Send temporary password to user's email
  const emailSubject = "Your Temporary Password";
  const emailBody = `
    Hello ${user.name || user.email},
    
    Your identity has been verified. Here is your temporary password:
    
    ${tempPassword}
    
    Use this to log in, and you will be prompted to set a new password.
    This temporary password is valid for one use only.
    
    For security reasons, please do not share this password with anyone.
  `;

  await sendEmail(email, emailSubject, emailBody);

  return true;
};

// Forget password flow - Step 3: Set new password with temporary password
export const setNewPasswordWithTemp = async (
  email: string,
  tempPassword: string,
  newPassword: string
) => {
  // 1. Find user
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  // 2. Verify the temporary password and check if tempPasswordFlag is true
  const isPasswordMatch = await user.comparePassword(tempPassword);
  if (!isPasswordMatch || !user.tempPasswordFlag) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED
    );
  }

  // 3. Hash and set the new password
  user.password = await argon2.hash(newPassword);
  user.tempPasswordFlag = false;
  await user.save();

  // 4. Notify user about password change
  const emailSubject = "Password Successfully Changed";
  const emailBody = `
    Hello ${user.name || user.email},
    
    Your password has been successfully changed. 
    
    If you did not perform this action, please contact support immediately.
  `;

  await sendEmail(email, emailSubject, emailBody);

  return true;
};

// Reset password
export const resetPassword = async (
  email: string,
  newPassword: string,
  verificationCode: string
) => {
  const user = await UserModel.findOne({ email, verificationCode });
  if (!user) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_VERIFICATION_CODE,
      HttpStatus.BAD_REQUEST
    );
  }
  user.password = await argon2.hash(newPassword);
  user.verificationCode = undefined;
  await user.save();
  return true;
};

// Generate verification code
export const generateVerificationCode = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
  const verificationCode = Math.random().toString(36).substring(2, 8);
  user.verificationCode = verificationCode;
  await user.save();
  return verificationCode;
};
