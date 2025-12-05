import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.email("El email no es válido").max(191),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(20, "La contraseña no puede superar 20 caracteres"),
    full_name: z.string().min(2, "Nombre muy corto").max(150, "Nombre muy extenso"),
    role: z.enum(['ADMIN', 'MANAGER', 'VIEWER']).optional() 
  })
});
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];


export const loginUserSchema = z.object({
  body: z.object({
    email: z.email("El email no es válido").max(191),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(20, "La contraseña no puede superar 20 caracteres")
  })
});
export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];
