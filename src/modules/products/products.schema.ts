import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    sku: z.string().min(3).max(100),
    name: z.string().min(2),
    description: z.string(),
    price: z.number().positive(),
    current_stock: z.number().int().nonnegative(), 
    min_stock: z.number().int().nonnegative().optional(),
    status: z.enum(['ACTIVE', 'DRAFT', 'DISCONTINUED']),
    supplier_id: z.uuid().nullable().optional(),
    category_id: z.number().int().positive()
  })
});
export type CreateProductInput = z.infer<typeof createProductSchema>['body'];

export const updateProductSchema = z.object({
  body: z.object({
    sku: z.string().min(3).optional(),
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    current_stock: z.number().int().nonnegative().optional(),
    min_stock: z.number().int().nonnegative().optional(),
    status: z.enum(['ACTIVE', 'DRAFT', 'DISCONTINUED']),
    supplier_id: z.uuid().nullable().optional(),
    category_id: z.number().int().positive().nullable().optional()
  })
});
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body'];

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.uuid()
  })
});
export type DeleteProductInput = z.infer<typeof deleteProductSchema>['params'];

export const updateStockSchema = z.object({
  body: z.object({
    current_stock: z.number().int().nonnegative()
  })
});
export type UpdateStockInput = z.infer<typeof updateStockSchema>['body'];