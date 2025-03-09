import { object, string, TypeOf } from "zod";

export const loginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email format"),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const changePasswordSchema = object({
  body: object({
    currentPassword: string({
      required_error: "Current password is required",
    }),
    newPassword: string({
      required_error: "New password is required",
    }).min(8, "Password must be at least 8 characters long"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type ILoginInput = TypeOf<typeof loginSchema>["body"];
export type IForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type IResetPasswordInput = TypeOf<typeof resetPasswordSchema>["body"];
export type IChangePasswordInput = TypeOf<typeof changePasswordSchema>["body"];
