import { randomUUID } from 'crypto';
import { AppError } from '../../middleware/app-error';
import { prisma } from '../../prisma/client';
import { CreateUserInput, LoginUserInput } from './auth.schema';
import { comparePassword, hashPassword } from '../../utils/hash';
import jwt from 'jsonwebtoken';

export const registerUser = async (data: CreateUserInput) => {
  const existingUser = await prisma.users.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new AppError('El email ya existe en el sistema', 409);
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await prisma.users.create({
    data: {
      id: randomUUID(),
      email: data.email,
      full_name: data.full_name,
      password: hashedPassword,
      role: data.role
    }
  });
  
  return user;
};

export const loginUser = async (data: LoginUserInput) => {
  const existingUser = await prisma.users.findUnique({
    where: { email: data.email }
  });

  if (!existingUser) {
    throw new AppError('Email o contraseña invalido', 404);
  }

  const passwordValid = await comparePassword(data.password, existingUser.password)

  if (!passwordValid) {
    throw new AppError('Email o contraseña invalido', 404);
  }

  const token = jwt.sign({ 
    id: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    full_name: existingUser.full_name
  }, process.env.JWT_SECRET as string, { expiresIn: process.env.ACCESS_EXPIRES_IN as any });
  
  return token;
}

