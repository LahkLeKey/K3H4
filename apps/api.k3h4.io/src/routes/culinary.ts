import {LifecycleStatus, Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {parseLifecycleStatus} from '../lib/status-utils';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

export function registerCulinaryRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/culinary/overview',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;

        const [menuItems, prepTasks, supplierNeeds] = await Promise.all([
          prisma.culinaryMenuItem.findMany(
              {where: {userId}, orderBy: {createdAt: 'desc'}}),
          prisma.culinaryPrepTask.findMany(
              {where: {userId}, orderBy: [{status: 'asc'}, {dueAt: 'asc'}]}),
          prisma.culinarySupplierNeed.findMany(
              {where: {userId}, orderBy: {createdAt: 'desc'}}),
        ]);

        const rt = withTelemetryBase(recordTelemetry, request);
        await rt({
          eventType: 'culinary.overview.fetch',
          source: 'api',
          payload: {
            menuCount: menuItems.length,
            prepCount: prepTasks.length,
            supplierCount: supplierNeeds.length
          },
        });

        return {menuItems, prepTasks, supplierNeeds};
      },
  );

  server.post(
      '/culinary/menu-items',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          name: string;
          prepMinutes: number;
          cost: number;
          price: number
        };
        const item = await prisma.culinaryMenuItem.create({
          data: {
            userId,
            name: body.name,
            prepMinutes: body.prepMinutes,
            cost: new Prisma.Decimal(Number(body.cost).toFixed(2)),
            price: new Prisma.Decimal(Number(body.price).toFixed(2)),
          },
        });

        const rt = withTelemetryBase(recordTelemetry, request);
        await rt({
          eventType: 'culinary.menu.create',
          source: 'api',
          payload: {name: item.name}
        });
        return {item};
      },
  );

  server.post(
      '/culinary/prep-tasks',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          task: string;
          station: string;
          dueAt?: string;
          status?: string
        };
        let prepStatus = LifecycleStatus.PENDING;
        if (body.status !== undefined) {
          const parsedStatus = parseLifecycleStatus(body.status);
          if (!parsedStatus)
            return reply.status(400).send({error: 'Invalid status'});
          prepStatus = parsedStatus;
        }
        const prep = await prisma.culinaryPrepTask.create({
          data: {
            userId,
            task: body.task,
            station: body.station,
            dueAt: body.dueAt ? new Date(body.dueAt) : null,
            status: prepStatus,
          },
        });

        const rt = withTelemetryBase(recordTelemetry, request);
        await rt({
          eventType: 'culinary.prep.create',
          source: 'api',
          payload: {station: prep.station}
        });
        return {prep};
      },
  );

  server.post(
      '/culinary/supplier-needs',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          item: string;
          quantity: string;
          status?: string;
          dueDate?: string
        };
        let needStatus = LifecycleStatus.OPEN;
        if (body.status !== undefined) {
          const parsedStatus = parseLifecycleStatus(body.status);
          if (!parsedStatus)
            return reply.status(400).send({error: 'Invalid status'});
          needStatus = parsedStatus;
        }
        const need = await prisma.culinarySupplierNeed.create({
          data: {
            userId,
            item: body.item,
            quantity: body.quantity,
            status: needStatus,
            dueDate: body.dueDate ? new Date(body.dueDate) : null,
          },
        });

        const rt = withTelemetryBase(recordTelemetry, request);
        await rt({
          eventType: 'culinary.supplier.create',
          source: 'api',
          payload: {item: need.item}
        });
        return {need};
      },
  );
}
