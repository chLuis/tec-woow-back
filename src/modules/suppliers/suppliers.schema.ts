import { z } from 'zod';

export const createSupplierSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    email: z.email().max(191),
    phone: z.string().max(50).optional(),
    contact_info: z.string().optional(),
  })
});
export type CreateSupplierInput = z.infer<typeof createSupplierSchema>['body'];

export const updateSupplierSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    email: z.email().max(191).optional(),
    phone: z.string().max(50).optional(),
    contact_info: z.string().optional(),
  })
});
export type UpdateSupplierInput = z.infer<typeof updateSupplierSchema>['body'];

export const deleteSupplierSchema = z.object({
  params: z.object({
    id: z.uuid()
  })
});
export type DeleteSupplierInput = z.infer<typeof deleteSupplierSchema>['params'];
