import { Request, Response, NextFunction } from 'express';
import * as supplierService from '@/modules/suppliers/suppliers.service.js';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await supplierService.showSuppliers();
    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    next(error);
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error); 
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId = req.params.id;
    await supplierService.updateSupplier(supplierId, req.body);
    res.status(200).json({ message: `Proveedor ${supplierId} actualizado.` });
  } catch (error) {
    next(error)
  }
};

export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplierId = req.params.id;
    await supplierService.deleteSupplier(supplierId);
    res.status(200).json({ message: `Proveedor ${supplierId} eliminado.` });
  }
  catch (error) {
    next(error);
  }
}
