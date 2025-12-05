import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const REFRESH_SECRET = process.env.REFRESH_SECRET as Secret;

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.ACCESS_EXPIRES_IN as any});

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRES_IN as any});

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.REFRESH_SECRET!);