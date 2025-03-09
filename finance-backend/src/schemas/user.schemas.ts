import { object, string, boolean, TypeOf, optional } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string().optional(),
    lastName: string().optional(),
    email: string({
      required_error: "email is required",
    }).email("Not a valid email address"),
    password: string({
      required_error: "password is required",
    }).min(8, "Password must be at least 8 characters"),
    phoneNumber: optional(
      string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits")
    ),
    preferences: object({
      pushNotifications: boolean().default(false),
      emailNotifications: boolean().default(true),
      smsNotifications: boolean().default(true),
      marketingEmails: boolean().default(false),
    }).default({}),
  }),
});

export type CreateUserInputSchema = TypeOf<typeof createUserSchema>["body"];
