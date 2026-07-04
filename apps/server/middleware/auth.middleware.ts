import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import apiResponse from "../utils/apiResponse";
import prismaClient from "../utils/prisma";

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

    // TODO: verify user in db

    if (!decoded.id) throw new Error("Incorrect Token !");

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error: any) {
    return res.status(401).json(apiResponse(401, error.message, null));
  }
};
