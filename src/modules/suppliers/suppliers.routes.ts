import { Router } from "express";
import { create, deleteSupplier, getAll, update } from "@/modules/suppliers/suppliers.controller.js";
import { validate } from "@/middleware/validate.js";
import { createSupplierSchema, deleteSupplierSchema, updateSupplierSchema } from "@/modules/suppliers/suppliers.schema.js";
import { authMiddleware } from "@/middleware/auth-middleware.js";

const route = Router()
route.get('/', authMiddleware, getAll);
route.post('/', authMiddleware, validate(createSupplierSchema), create);
route.put('/:id', authMiddleware, validate(updateSupplierSchema), update)
route.delete('/:id', authMiddleware, validate(deleteSupplierSchema), deleteSupplier)


export default route;