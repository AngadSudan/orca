import jwt from "jsonwebtoken";
import type { JwtPayload } from "./type";

export function generateFreshTokens(payload: JwtPayload) {
  const accessToken = generateAccessToken(payload);
  return { accessToken };
}

export function generateAccessToken(payload: JwtPayload) {
  const options = {
    expiresIn: "1d",
  };

  //@ts-ignore
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options);
  return token;
}

export function verifyAccessToken(accessToken: string) {
  try {
    return jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
  } catch (error) {
    throw new Error("invalid or expired access token");
  }
}
