export class AppError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: err.issues.map((i) => i.message).join(', ')
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err?.message || 'Internal Server Error'
  });
};
