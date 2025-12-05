import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = verifyAccessToken(token) as any;
    (req as any).userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
