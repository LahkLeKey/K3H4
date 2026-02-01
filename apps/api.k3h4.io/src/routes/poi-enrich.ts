import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';

import {readCachedEnrichment, writeCachedEnrichment} from '../services/poi-enrich/cache';
import {enrichPoi} from '../services/poi-enrich/enrich';
import {computeIncludeHash, parseFreshFlag, parseIncludeFlags, parseOrigin, parsePoiId} from '../services/poi-enrich/parse';

import {buildTelemetryBase} from './telemetry';
import type {RecordTelemetryFn} from './types';

const DEFAULT_ROUTE_MODE = 'driving';

export function registerPoiEnrichRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/api/poi/:id/actions/enrich',
      {
        schema: {
          params: {
            type: 'object',
            properties: {id: {type: 'string'}},
            required: ['id'],
          },
        },
      },
      async (request: FastifyRequest, reply: FastifyReply) => {
        const idParam = (request.params as {id: string}).id;
        const poiId = parsePoiId(idParam);
        if (!poiId)
          return reply.status(400).send(
              {error: 'id must be node|way|relation followed by digits'});

        const flags = parseIncludeFlags(
            (request.query as Record<string, unknown>).include);
        const fresh =
            parseFreshFlag((request.query as Record<string, unknown>).fresh);
        const mode = `${
            (request.query as Record<string, unknown>).mode ??
            DEFAULT_ROUTE_MODE}`;

        const origin = flags.route ?
            parseOrigin(request.query as Record<string, unknown>) :
            null;
        if (flags.route && !origin)
          return reply.status(400).send({
            error: 'originLat and originLon are required when include=route'
          });

        const includeHash = computeIncludeHash(flags, origin, mode);
        const cacheKey = `${poiId.type}/${poiId.id}`;

        if (!fresh) {
          const cached =
              await readCachedEnrichment(prisma, cacheKey, includeHash);
          if (cached) {
            reply.header('Cache-Control', 'public, max-age=300');
            return cached;
          }
        }

        try {
          const enriched = await enrichPoi(prisma, poiId, flags, origin, mode);
          void writeCachedEnrichment(prisma, cacheKey, includeHash, enriched)
              .catch(
                  (err) =>
                      request.log.warn({err}, 'enrich cache write failed'));
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'poi.enrich',
            source: 'api',
            payload: {poi: cacheKey, includeHash},
          });
          reply.header('Cache-Control', 'public, max-age=60');
          return enriched;
        } catch (err: any) {
          const statusCode = err?.statusCode ??
              (err?.message?.includes('Overpass') ? 502 : 500);
          if (statusCode === 404)
            return reply.status(404).send({error: 'POI not found'});
          if (statusCode === 400)
            return reply.status(400).send(
                {error: err?.message ?? 'bad request'});
          request.log.error({err}, 'poi enrichment failed');
          return reply.status(statusCode).send({error: 'enrichment failed'});
        }
      },
  );
}
