import { Router } from "express";
import { create, deleteProduct, getAll, getCategories, getStats, update, updateStock } from "@/modules/products/products.controller.js";
import { validate } from "@/middleware/validate.js";
import { createProductSchema, deleteProductSchema, updateProductSchema, updateStockSchema } from "@/modules/products/products.schema.js";
import { authMiddleware } from "@/middleware/auth-middleware.js";


const route = Router()
route.get('/', authMiddleware, getAll);
route.post('/', authMiddleware, validate(createProductSchema), create);
route.put('/:id', authMiddleware, validate(updateProductSchema), update)
route.delete('/:id', authMiddleware, validate(deleteProductSchema), deleteProduct)

// Nota: Aqui actulizo manualmente el stock, se puede aumentar o disminuir respecto al stock actual 
// o actualizar de manera manual el numero. 
// En este caso opté por la inserción manual del nuevo stock
route.patch('/:id/stock', authMiddleware, validate(updateStockSchema), updateStock) 

//Para no crear todo un modulo, hago un get de categorias aqui
route.get('/categories', authMiddleware, getCategories)

//Stats
route.get('/stats/dashboard', authMiddleware, getStats);


export default route;