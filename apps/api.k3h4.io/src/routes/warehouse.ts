import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply} from 'fastify';

import {type CreateWarehouseItemCommand, type UpdateWarehouseItemCommand, WarehouseInventoryError} from '../kits/warehouse-inventory';
import {createPrismaWarehouseInventoryKit} from '../kits/warehouse-inventory/prisma-adapter';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

type CreateWarehouseItemBody = Omit<CreateWarehouseItemCommand, 'userId'>;
type UpdateWarehouseItemBody =
    Omit<UpdateWarehouseItemCommand, 'userId'|'itemId'>;

const sendWarehouseError = (error: unknown, reply: FastifyReply) => {
  if (!(error instanceof WarehouseInventoryError)) throw error;
  const status = error.code === 'INVALID_ITEM' ||
          error.code === 'INVALID_QUANTITY' || error.code === 'INVALID_STATUS' ?
      400 :
      404;
  return reply.status(status).send({error: error.message});
};

export function registerWarehouseRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const warehouse = createPrismaWarehouseInventoryKit(prisma);

  server.get(
      '/warehouse/items',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const items = await warehouse.listItems(userId);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.list',
          source: 'api',
          payload: {count: items.length},
        });
        return {items};
      },
  );

  server.post(
      '/warehouse/items',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as CreateWarehouseItemBody | undefined;
        try {
          const item = await warehouse.createItem({userId, ...body});
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'warehouse.create',
            source: 'api',
            payload: {
              sku: body?.sku,
              freightLoadId: item.freightLoadId ?? undefined,
            },
          });
          return {item};
        } catch (error) {
          return sendWarehouseError(error, reply);
        }
      },
  );

  server.delete(
      '/warehouse/items/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        try {
          await warehouse.deleteItem(userId, id);
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'warehouse.delete',
            source: 'api',
            payload: {id},
          });
          return {success: true};
        } catch (error) {
          return sendWarehouseError(error, reply);
        }
      },
  );

  server.patch(
      '/warehouse/items/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const itemId = (request.params as {id: string}).id;
        const body = request.body as UpdateWarehouseItemBody | undefined;
        try {
          const item = await warehouse.updateItem({userId, itemId, ...body});
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'warehouse.update',
            source: 'api',
            payload: {
              id: itemId,
              freightLoadId: item.freightLoadId ?? undefined,
            },
          });
          return {item};
        } catch (error) {
          return sendWarehouseError(error, reply);
        }
      },
  );
}
