import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import apiResponse from "../utils/apiResponse";
import userRepository from "../repository/user.repository";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Unauthorised, Re-login");
    }

    const decoded = verifyAccessToken(token);

    if (!decoded.email) throw new Error("Invalid Token!");

    const dbUser = await userRepository.getUser(decoded.email);
    if (!dbUser) throw new Error("Invalid User!");
    req.user = {
      email: dbUser.email,
    };

    next();
  } catch (error: any) {
    return res.status(401).json(apiResponse(401, error.message, null));
  }
};
