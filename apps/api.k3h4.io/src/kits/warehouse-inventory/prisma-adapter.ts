import {Prisma, type PrismaClient} from '@prisma/client';

import {buildWarehouseItemPayload, ensureWarehouseActor} from '../../actors/Warehouse/Warehouse';
import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {createPrismaAgricultureOperationsKit} from '../agriculture-operations/prisma-adapter';
import {createPrismaFreightRoutingKit} from '../freight-routing/prisma-adapter';

import {createWarehouseInventoryKit, type WarehouseInventoryHost} from './index';

const toJsonValue = (metadata: Record<string, unknown>) =>
    Object.keys(metadata).length ? metadata as Prisma.InputJsonValue :
                                   Prisma.JsonNull;

const createPrismaWarehouseInventoryHost =
    (prisma: PrismaClient): WarehouseInventoryHost => ({
      async listItems(userId) {
        const actor = await ensureWarehouseActor(prisma, userId);
        const items = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: ENTITY_KINDS.WAREHOUSE_ITEM},
          orderBy: {createdAt: 'desc'},
        });
        return items.map((item) => buildWarehouseItemPayload(item, userId));
      },
      async findItem(userId, itemId) {
        const actor = await ensureWarehouseActor(prisma, userId);
        const item = await prisma.entity.findFirst({
          where: {
            id: itemId,
            actorId: actor.id,
            kind: ENTITY_KINDS.WAREHOUSE_ITEM,
          },
        });
        return item ? buildWarehouseItemPayload(item, userId) : null;
      },
      async createItem(userId, metadata) {
        const actor = await ensureWarehouseActor(prisma, userId);
        const item = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: ENTITY_KINDS.WAREHOUSE_ITEM,
            source: 'k3h4-warehouse',
            metadata: toJsonValue(metadata),
          },
        });
        return buildWarehouseItemPayload(item, userId);
      },
      async updateItem(userId, itemId, metadata) {
        const item = await prisma.entity.update({
          where: {id: itemId},
          data: {metadata: toJsonValue(metadata)},
        });
        return buildWarehouseItemPayload(item, userId);
      },
      async deleteItem(userId, itemId) {
        const actor = await ensureWarehouseActor(prisma, userId);
        const item = await prisma.entity.findFirst({
          where: {
            id: itemId,
            actorId: actor.id,
            kind: ENTITY_KINDS.WAREHOUSE_ITEM,
          },
          select: {id: true},
        });
        if (!item) return false;
        await prisma.entity.delete({where: {id: itemId}});
        return true;
      },
    });

export const createPrismaWarehouseInventoryKit = (prisma: PrismaClient) => {
  const freight = createPrismaFreightRoutingKit(prisma, async () => {
    throw new Error('Warehouse inventory does not resolve freight routes');
  });
  const agriculture = createPrismaAgricultureOperationsKit(prisma);
  return createWarehouseInventoryKit({
    host: createPrismaWarehouseInventoryHost(prisma),
    freight,
    agriculture: agriculture.plots,
  });
};