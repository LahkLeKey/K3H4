import type {PrismaClient} from '@prisma/client';
import type {FastifyInstance, FastifyReply} from 'fastify';

import {withTelemetryBase} from '../../routes/telemetry';
import type {RecordTelemetryFn} from '../../routes/types';

import {AgricultureOperationsError, type AgriculturePayload} from './index';
import {createPrismaAgricultureOperationsKit} from './prisma-adapter';

const userIdFrom = (request: {user: unknown}) =>
  (request.user as {sub: string}).sub;

const mapAgricultureError = (error: unknown, reply: FastifyReply) => {
  if (!(error instanceof AgricultureOperationsError)) throw error;
  const status = error.code === 'NOT_FOUND' ||
      error.code === 'FREIGHT_LOAD_NOT_FOUND' ? 404 : 400;
  return reply.status(status).send({error: error.message});
};

export function registerAgricultureRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const agriculture = createPrismaAgricultureOperationsKit(prisma);

  server.get(
      '/agriculture/overview',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.overview.getOverview(userIdFrom(request));
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.overview.fetch', source: 'api', payload: {},
        });
        return result;
      },
  );

  server.get(
      '/agriculture/analytics',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.overview.getAnalytics(userIdFrom(request));
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.analytics.fetch', source: 'api', payload: {},
        });
        return result;
      },
  );

  server.get(
      '/agriculture/slots',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.plots.listSlots(userIdFrom(request));
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.slots.list',
          source: 'api',
          payload: {count: result.slots.length},
        });
        return result;
      },
  );

  server.post(
      '/agriculture/slots/actions/unlock',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        try {
          const result = await agriculture.plots.unlockSlot(
              userIdFrom(request), (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.slot.unlock',
            source: 'api',
            payload: {slotIndex: result.slotIndex, costPaid: result.costPaid},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.patch(
      '/agriculture/slots/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const slotId = (request.params as {id: string}).id;
        try {
          const result = await agriculture.plots.updateSlot(
              userIdFrom(request), slotId,
              (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.slot.update',
            source: 'api',
            payload: {slotId, plotId: result.plotId},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.get(
      '/agriculture/plots',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.plots.listPlots(userIdFrom(request));
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.plots.list',
          source: 'api',
          payload: {count: result.plots.length},
        });
        return result;
      },
  );

  server.post(
      '/agriculture/plots',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        try {
          const result = await agriculture.plots.createPlot(
              userIdFrom(request), (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.plot.create',
            source: 'api',
            payload: {plotId: result.id},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.post(
      '/agriculture/plots/:id/actions/condition',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const plotId = (request.params as {id: string}).id;
        try {
          const result = await agriculture.plots.recordCondition(
              userIdFrom(request), plotId,
              (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.plot.condition',
            source: 'api',
            payload: {plotId},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.get(
      '/agriculture/plans',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.plans.listPlans(userIdFrom(request));
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.plans.list',
          source: 'api',
          payload: {count: result.plans.length},
        });
        return result;
      },
  );

  server.post(
      '/agriculture/plans',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        try {
          const result = await agriculture.plans.createPlan(
              userIdFrom(request), (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.plan.create',
            source: 'api',
            payload: {planId: result.id},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.get(
      '/agriculture/tasks',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const status = (request.query as {status?: string}).status;
        try {
          const result = await agriculture.plans.listTasks(
              userIdFrom(request), status);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.tasks.list',
            source: 'api',
            payload: {count: result.tasks.length},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.post(
      '/agriculture/tasks',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        try {
          const result = await agriculture.plans.createTask(
              userIdFrom(request), (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.task.create',
            source: 'api',
            payload: {taskId: result.id},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.patch(
      '/agriculture/tasks/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const taskId = (request.params as {id: string}).id;
        try {
          const result = await agriculture.plans.updateTask(
              userIdFrom(request), taskId,
              (request.body ?? {}) as AgriculturePayload);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.task.update',
            source: 'api',
            payload: {taskId},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.get(
      '/agriculture/inventory',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.inventory.list(userIdFrom(request));
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.inventory.list',
          source: 'api',
          payload: {count: result.inventory.length},
        });
        return result;
      },
  );

  server.post(
      '/agriculture/inventory',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const body = (request.body ?? {}) as AgriculturePayload;
        try {
          const result = await agriculture.inventory.createItem(
              userIdFrom(request), body);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.inventory.create',
            source: 'api',
            payload: {sku: String(body.sku).trim()},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.post(
      '/agriculture/inventory/movements',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const body = (request.body ?? {}) as AgriculturePayload;
        try {
          const result = await agriculture.inventory.recordMovement(
              userIdFrom(request), body);
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.inventory.movement',
            source: 'api',
            payload: {
              inventoryId: result.id,
              movementId: result.movements[0].id,
            },
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.post(
      '/agriculture/shipments',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const body = (request.body ?? {}) as AgriculturePayload;
        if (!body.lot || !body.destination || !body.mode) {
          return reply.status(400).send(
              {error: 'lot, destination, and mode are required'});
        }
        try {
          const result = await agriculture.shipments.create(userIdFrom(request), {
            lot: body.lot,
            destination: body.destination,
            mode: body.mode,
            eta: body.eta,
            freightLoadId: body.freightLoadId,
          });
          await withTelemetryBase(recordTelemetry, request)({
            eventType: 'agriculture.shipment.create',
            source: 'api',
            payload: {shipmentId: result.id},
          });
          return result;
        } catch (error) {
          return mapAgricultureError(error, reply);
        }
      },
  );

  server.get(
      '/agriculture/resources',
      {preHandler: [server.authenticate]},
      async (request) => {
        const result = await agriculture.resources.list();
        await withTelemetryBase(recordTelemetry, request)({
          eventType: 'agriculture.resources.fetch',
          source: 'api',
          payload: {count: result.categories.length},
        });
        return result;
      },
  );
}
