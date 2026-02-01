import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';

import {ensureGeoGlobalActor} from '../actors/Geo/Geo';
import type {BuildingCachePayload} from '../services/building-cache';
import {formatBuildingFromPayload, normalizeOsmType, readBuildingCacheById, readBuildingCacheByOsm,} from '../services/building-cache';

const parseIncludeGeometry = (value: unknown) =>
    `${value}`.toLowerCase() === 'true' || value === true;

const handleNotFound = (reply: FastifyReply) =>
    reply.status(404).send({error: 'building not found'});

export function registerBuildingRoutes(
    server: FastifyInstance, prisma: PrismaClient) {
  server.get(
      '/buildings/lookup',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const query = request.query as Record<string, unknown>;
        const includeGeometry = parseIncludeGeometry(query.includeGeometry);
        const actor = await ensureGeoGlobalActor(prisma);
        const actorId = actor.id;

        const id = query.id !== undefined ? `${query.id}`.trim() : '';
        const osmId = query.osmId !== undefined ? `${query.osmId}`.trim() : '';
        const osmType = normalizeOsmType(query.osmType as string | undefined);
        const lat = query.lat !== undefined ? Number(query.lat) : undefined;
        const lng = query.lng !== undefined ? Number(query.lng) : undefined;

        let payload: BuildingCachePayload|null = null;

        if (id) {
          payload = await readBuildingCacheById(prisma, actorId, id);
        } else if (osmId) {
          payload =
              await readBuildingCacheByOsm(prisma, actorId, osmType, osmId);
        } else if (Number.isFinite(lat) && Number.isFinite(lng)) {
          return reply.status(400).send(
              {error: 'lat/lng lookup requires PostGIS; use id or osmId'});
        } else {
          return reply.status(400).send({error: 'provide id/osmId'});
        }

        if (!payload) return handleNotFound(reply);
        return {building: formatBuildingFromPayload(payload, includeGeometry)};
      },
  );

  server.get(
      '/buildings/:id',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const params = request.params as {id?: string};
        const includeGeometry = parseIncludeGeometry(
            (request.query as Record<string, unknown>).includeGeometry);
        const id = params.id?.trim();
        if (!id) return reply.status(400).send({error: 'id is required'});

        const actor = await ensureGeoGlobalActor(prisma);
        const payload = await readBuildingCacheById(prisma, actor.id, id);
        if (!payload) return handleNotFound(reply);
        return {building: formatBuildingFromPayload(payload, includeGeometry)};
      },
  );
}
