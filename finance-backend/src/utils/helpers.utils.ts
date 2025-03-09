import jwt from "jsonwebtoken";
import config from "config";

export const signToken = (userId: string, expiresIn: string): string => {
  return jwt.sign({ id: userId }, config.get<string>("jwtSecret"), {
    expiresIn,
  });
};
