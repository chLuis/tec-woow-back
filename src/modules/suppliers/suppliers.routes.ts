import { Router } from "express";
import { create, deleteSupplier, getAll, update } from "./suppliers.controller";
import { validate } from "../../middleware/validate";
import { createSupplierSchema, deleteSupplierSchema, updateSupplierSchema } from "./suppliers.schema";
import { authMiddleware } from "../../middleware/auth-middleware";

const route = Router()
route.get('/', authMiddleware, getAll);
route.post('/', authMiddleware, validate(createSupplierSchema), create);
route.put('/:id', authMiddleware, validate(updateSupplierSchema), update)
route.delete('/:id', authMiddleware, validate(deleteSupplierSchema), deleteSupplier)


export default route;