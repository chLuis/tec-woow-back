import { randomUUID } from 'crypto';
import { AppError } from '@/middleware/app-error.js';
import { prisma } from '@/prisma/client.js';
import { Prisma } from '@prisma/client';
import { CreateSupplierInput } from '@/modules/suppliers/suppliers.schema.js';

export const createSupplier = async (data: CreateSupplierInput) => {
  const existingSupplier = await prisma.suppliers.findUnique({
    where: { email: data.email }
  });

  if (existingSupplier) {
    throw new AppError('El email ya existe en el sistema', 409);
  }

  const supplier = await prisma.suppliers.create({
    data: {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      contact_info: data.contact_info
    }
  });

  return supplier;
};

interface ShowSupplierParams {
  page?: number;
  limit?: number;
}

export const showSuppliers = async () => {
  const where: Prisma.suppliersWhereInput = {
    deleted_at: null,
  }


  const [total, suppliers] = await prisma.$transaction([
    prisma.suppliers.count(),
    prisma.suppliers.findMany({
      orderBy: {
        created_at: 'desc'
      },
      where
    }),
  ]);


  return {
    data: suppliers,
  };
};

export const updateSupplier = async (supplierId: string, data: Partial<CreateSupplierInput>) => {

  const existingSupplier = await prisma.suppliers.findUnique({
    where: { id: supplierId }
  });

  if (!existingSupplier) {
    throw new AppError('El proveedor no existe', 404);
  }

  const updatedSupplier = await prisma.suppliers.update({
    where: { id: supplierId },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      contact_info: data.contact_info
    }
  });
  return updatedSupplier;
}

export const deleteSupplier = async (supplierId: string) => {
  const existingSupplier = await prisma.suppliers.findUnique({
    where: { id: supplierId }
  });

  if (!existingSupplier) {
    throw new AppError('El proveedor no existe', 404);
  }

  await prisma.suppliers.update({
    where: { id: supplierId },
    data: {
      deleted_at: new Date()
    }
  });
}
