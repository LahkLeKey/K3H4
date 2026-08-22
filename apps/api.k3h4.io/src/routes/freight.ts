import {Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {ensureGeoActor} from '../actors/Geo/Geo';
import {FreightLoadAlreadyCompletedError, FreightLoadNotFoundError} from '../kits/freight-routing';
import {createPrismaFreightRoutingKit} from '../kits/freight-routing/prisma-adapter';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const serializeLoad = (load: any) => ({
  ...load,
  distanceKm: load.distanceKm instanceof Prisma.Decimal ?
      load.distanceKm.toFixed(2) :
      load.distanceKm,
  cost: load.cost instanceof Prisma.Decimal ? load.cost.toFixed(2) : load.cost,
});

export function registerFreightRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const freight = createPrismaFreightRoutingKit(
      prisma, async (userId) => (await ensureGeoActor(prisma, userId)).id);

  server.get(
      '/freight',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const loads = await freight.listLoads(userId);
        await rt({
          eventType: 'freight.list',
          source: 'api',
          payload: {count: loads.length},
        });
        return {loads: loads.map(serializeLoad)};
      },
  );

  server.post(
      '/freight',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          title?: string;
          originName?: string;
          originLat?: number;
          originLng?: number;
          destinationName?: string;
          destinationLat?: number;
          destinationLng?: number;
          ratePerKm?: number;
        }|undefined;

        const required = [body?.title, body?.originName, body?.destinationName];
        if (required.some((value) =>
          !value || String(value).trim().length === 0)) {
          return reply.status(400).send(
              {error: 'title, originName, destinationName are required'});
        }
        const originLat = Number(body?.originLat);
        const originLng = Number(body?.originLng);
        const destinationLat = Number(body?.destinationLat);
        const destinationLng = Number(body?.destinationLng);
        if (![originLat, originLng, destinationLat, destinationLng].every(
                Number.isFinite)) {
          return reply.status(400).send(
              {error: 'origin/destination coordinates are required'});
        }

        try {
          const load = await freight.planLoad({
            userId,
            title: body!.title!,
            originName: body!.originName!,
            origin: {lat: originLat, lng: originLng},
            destinationName: body!.destinationName!,
            destination: {lat: destinationLat, lng: destinationLng},
            ratePerKm: Number(body?.ratePerKm ?? 2),
          });
          await rt({
            eventType: 'freight.create',
            source: 'api',
            payload: {id: load.id, title: load.title},
          });
          return {load: serializeLoad(load)};
        } catch (err) {
          request.log.error({err}, 'freight OSRM request failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message : 'OSRM route failed',
          });
        }
      },
  );

  server.get(
      '/freight/:id/directions',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        try {
          return {direction: await freight.getDirections(userId, id)};
        } catch (err) {
          if (err instanceof FreightLoadNotFoundError) {
            return reply.status(404).send({error: err.message});
          }
          request.log.error({err, id}, 'freight directions failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message :
                                          'Unable to load directions',
          });
        }
      },
  );

  server.post(
      '/freight/:id/actions/complete',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        try {
          const load = await freight.completeLoad(userId, id);
          await rt({
            eventType: 'freight.complete',
            source: 'api',
            payload: {id, cost: Number(load.cost).toFixed(2)},
          });
          return {load: serializeLoad(load)};
        } catch (err) {
          if (err instanceof FreightLoadNotFoundError) {
            return reply.status(404).send({error: err.message});
          }
          if (!(err instanceof FreightLoadAlreadyCompletedError)) {
            request.log.error({err}, 'freight completion failed');
          }
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to complete load',
          });
        }
      },
  );
    }
