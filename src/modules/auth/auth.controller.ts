import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';



export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error); 
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.loginUser(req.body);
    res.status(200).json({ message: `Bienvenido/a.`, payload: token });
  } catch (error) {
    next(error)
  }
};
