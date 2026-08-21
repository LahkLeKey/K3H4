import {type PrismaClient} from '@prisma/client';

import {
  loadCulinaryMenuItems,
  loadCulinaryPrepTasks,
  loadCulinarySupplierNeeds,
} from '../../services/culinary-ledger';
import {
  getPointOfSaleOverview,
  type PointOfSaleOverview,
} from '../../services/point-of-sale-ledger';

export type CulinaryOverview = {
  menuItems: Awaited<ReturnType<typeof loadCulinaryMenuItems>>;
  prepTasks: Awaited<ReturnType<typeof loadCulinaryPrepTasks>>;
  supplierNeeds: Awaited<ReturnType<typeof loadCulinarySupplierNeeds>>;
  pointOfSale: PointOfSaleOverview;
};

type CulinaryOverviewLoaders = {
  loadMenuItems: typeof loadCulinaryMenuItems;
  loadPrepTasks: typeof loadCulinaryPrepTasks;
  loadSupplierNeeds: typeof loadCulinarySupplierNeeds;
  loadPointOfSaleOverview: typeof getPointOfSaleOverview;
};

export async function getCulinaryOverview(
    prisma: PrismaClient, userId: string,
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