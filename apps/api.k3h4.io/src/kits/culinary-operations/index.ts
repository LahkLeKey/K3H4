import {Prisma, type PrismaClient} from '@prisma/client';

import {createCulinaryMenuItem as createMenuItem, createCulinaryPrepTask as createPrepTask, createCulinarySupplierNeed as createSupplierNeed, loadCulinaryMenuItems, loadCulinaryPrepTasks, loadCulinarySupplierNeeds,} from '../../services/culinary-ledger';
import {getPointOfSaleOverview, type PointOfSaleOverview,} from '../point-of-sale';

export type CulinaryOverview = {
  menuItems: Awaited<ReturnType<typeof loadCulinaryMenuItems>>;
  prepTasks: Awaited<ReturnType<typeof loadCulinaryPrepTasks>>;
  supplierNeeds: Awaited<ReturnType<typeof loadCulinarySupplierNeeds>>;
  pointOfSale: PointOfSaleOverview;
};

export type CulinaryMenuItemCommand = {
  name: string; prepMinutes: number; cost: number; price: number;
};

export type CulinaryPrepTaskCommand = {
  task: string; station: string;
  dueAt?: string; status: Parameters<typeof createPrepTask>[2]['status'];
};

export type CulinarySupplierNeedCommand = {
  item: string; quantity: string;
  dueDate?: string; status: Parameters<typeof createSupplierNeed>[2]['status'];
};

type CulinaryTransaction = PrismaClient|Prisma.TransactionClient;

export const createCulinaryMenuItem =
    (transaction: CulinaryTransaction, userId: string,
     command: CulinaryMenuItemCommand) =>
        createMenuItem(transaction, userId, command);

export const createCulinaryPrepTask =
    (transaction: CulinaryTransaction, userId: string,
     command: CulinaryPrepTaskCommand) =>
        createPrepTask(transaction, userId, command);

export const createCulinarySupplierNeed =
    (transaction: CulinaryTransaction, userId: string,
     command: CulinarySupplierNeedCommand) =>
        createSupplierNeed(transaction, userId, command);

type CulinaryOverviewLoaders = {
  loadMenuItems: typeof loadCulinaryMenuItems;
  loadPrepTasks: typeof loadCulinaryPrepTasks;
  loadSupplierNeeds: typeof loadCulinarySupplierNeeds;
  loadPointOfSaleOverview: typeof getPointOfSaleOverview;
};

export async function getCulinaryOverview(
    prisma: PrismaClient,
    userId: string,
    loaders: Partial<CulinaryOverviewLoaders> = {},
    ): Promise<CulinaryOverview> {
  const activeLoaders: CulinaryOverviewLoaders = {
    loadMenuItems: loadCulinaryMenuItems,
    loadPrepTasks: loadCulinaryPrepTasks,
    loadSupplierNeeds: loadCulinarySupplierNeeds,
    loadPointOfSaleOverview: getPointOfSaleOverview,
    ...loaders,
  };
  const [menuItems, prepTasks, supplierNeeds, pointOfSale] = await Promise.all([
    activeLoaders.loadMenuItems(prisma, userId),
    activeLoaders.loadPrepTasks(prisma, userId),
    activeLoaders.loadSupplierNeeds(prisma, userId),
    activeLoaders.loadPointOfSaleOverview(prisma, userId),
  ]);
  return {menuItems, prepTasks, supplierNeeds, pointOfSale};
}