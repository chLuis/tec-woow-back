import { Request, Response, NextFunction } from 'express';
import * as productService from './products.service';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const category = req.query.category ? String(req.query.category) : null;
    const supplier = req.query.supplier ? String(req.query.supplier) : null;
    const status = req.query.status ? String(req.query.status) as 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' : null;
    
    const result = await productService.showProducts({page, limit, category, supplier, status});

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    next(error);
  }
}

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.dashboardProducts();

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
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error); 
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    await productService.updateProduct(productId, req.body);
    res.status(200).json({ message: `Producto ${productId} actualizado.` });
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);
    res.status(200).json({ message: `Producto ${productId} eliminado.` });
  }
  catch (error) {
    next(error);
  }
}

export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    await productService.updateProductStock(productId, req.body);
    res.status(200).json({ message: `Stock del producto ${productId} actualizado.` });
  } catch (error) {
    next(error)
  }
};


export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await productService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}