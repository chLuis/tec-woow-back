import { randomUUID } from 'crypto';
import { AppError } from '@/middleware/app-error.js';
import { prisma } from '@/prisma/client.js';
import { CreateProductInput } from '@/modules/products/products.schema.js';
import { DashboardResult, PaginatedResult } from '@/utils/types.js';
import { Prisma } from '@prisma/client';

export const createProduct = async (data: CreateProductInput) => {
  const existingProduct = await prisma.products.findUnique({
    where: { sku: data.sku }
  });

  if (existingProduct) {
    throw new AppError('El SKU ya existe en el sistema', 409);
  }

  const product = await prisma.products.create({
    data: {
      id: randomUUID(),
      sku: data.sku,
      name: data.name,
      description: data.description,
      price: data.price,
      current_stock: 0,
      min_stock: data.min_stock ?? 0,
      status: 'ACTIVE',
      category_id: data.category_id
    }
  });

  return product;
};

interface ShowProductsParams {
  page?: number;
  limit?: number;
  category?: string | null;
  supplier?: string | null;
  status?: 'ACTIVE' | 'DRAFT' | 'DISCONTINUED' | null;
}

export const showProducts = async (
  {
  page = 1,
  limit = 10,
  category,
  supplier,
  status
}: ShowProductsParams
): Promise<PaginatedResult> => {
  const skip = (page - 1) * limit;

  const where: Prisma.productsWhereInput = {
    deleted_at: null,
  }

  if (status) {
    where.status = status;
  }

  if (category) {
    const categoryDecoded = decodeURIComponent(category || "");
    const cleanCategory = categoryDecoded.trim().replace(/\s+/g, " ");
    const categoryRecord = await prisma.categories.findFirst({
      where: { name: cleanCategory }
    });
    if (categoryRecord) {
      where.category_id = categoryRecord.id;
    } else {
      return emptyResult(page)
    }
  }
if (supplier) {
  const supplierDecoded = decodeURIComponent(supplier || "");
  const cleanSupplier = supplierDecoded.trim().replace(/\s+/g, " ");
  const supplierRecord = await prisma.suppliers.findFirst({
      where: { name: cleanSupplier }
    });
    
    if (supplierRecord) {
      where.supplier_id = supplierRecord.id;
    } else {
      return emptyResult(page);
    }
  }



  const [total, products] = await prisma.$transaction([
    prisma.products.count({where}),
    prisma.products.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        name: 'asc'
      },
      where,
      include: {
        categories: {
          select: {
            name: true
          }
        },
        suppliers: {
          select: {
            name: true,
            email: true
          }
        }
      }
    }),
  ]);

  const lastPage = Math.ceil(total / limit);

  return {
    data: products,
    meta: {
      total,
      page,
      lastPage,
    }
  };
};

export const dashboardProducts = async (): Promise<DashboardResult> => {

  const where: Prisma.productsWhereInput = {
    deleted_at: null,
  }

  const [total, products] = await prisma.$transaction([
    prisma.products.count({where}),
    prisma.products.findMany({
      orderBy: {
        name: 'asc'
      },
      where,
      include: {
        categories: {
          select: {
            name: true
          }
        },
        suppliers: {
          select: {
            name: true,
            email: true
          }
        }
      }
    }),
  ]);

  return {
    data: products,
    meta: {
      total
    }
  };
};

export const updateProduct = async (productId: string, data: Partial<CreateProductInput>) => {

  const existingProduct = await prisma.products.findUnique({
    where: { id: productId }
  });

  if (!existingProduct) {
    throw new AppError('El producto no existe', 404);
  }

  const updatedProduct = await prisma.products.update({
    where: { id: productId },
    data: {
      sku: data.sku,
      name: data.name,
      description: data.description,
      price: data.price,
      current_stock: data.current_stock,
      min_stock: data.min_stock,
      status: data.status,
      supplier_id: data.supplier_id,
      category_id: data.category_id
    }
  });
  return updatedProduct;
}

export const deleteProduct = async (productId: string) => {
  const existingProduct = await prisma.products.findUnique({
    where: { id: productId }
  });

  if (!existingProduct) {
    throw new AppError('El producto no existe', 404);
  }

  await prisma.products.update({
    where: { id: productId },
    data: {
      deleted_at: new Date()
    }
  });
}

export const updateProductStock = async (productId: string, data: { current_stock: number }) => {
  const existingProduct = await prisma.products.findUnique({
    where: { id: productId }
  });
  if (!existingProduct) {
    throw new AppError('El producto no existe', 404);
  }
  const updatedProduct = await prisma.products.update({
    where: { id: productId },
    data: {
      current_stock: data.current_stock
    }
  });
  return updatedProduct;
};



const emptyResult = (page: number) => ({
  data: [],
  meta: { total: 0, page, lastPage: 0 }
});


export const getCategories = async () => {
  const categories = await prisma.categories.findMany({});
  return categories;
}