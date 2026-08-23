import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {ensureGeoActor, ensureGeoGlobalActor} from '../actors/Geo/Geo';
import {createGeoMapBootstrapKit} from '../kits/geo-map-bootstrap';
import {createPrismaGeoCoreHost, createPrismaGeoCoreKit} from '../kits/geo-core/prisma-adapter';
import {enrichPoi} from '../services/poi-enrich/enrich';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

type BootstrapBody = {
  includePrefs?: boolean;
  includeHistory?: boolean;
  includeMap?: boolean;
  historyLimit?: number;
  viewport?: {
    center?: {lat: number; lng: number};
    radiusM?: number;
    kinds?: string[] | string
  };
  selectedPoi?: {id?: string; includeGeometry?: boolean};
};

export function registerFrontendRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const geoCoreHost = createPrismaGeoCoreHost(prisma);
  const bootstrap = createGeoMapBootstrapKit({
    geoCore: createPrismaGeoCoreKit(prisma),
    geoCoreHost,
    async resolveActorId(userId) {
      return (await ensureGeoActor(prisma, userId)).id;
    },
    async resolveGlobalActorId() {
      return (await ensureGeoGlobalActor(prisma)).id;
    },
    enrichSelectedPoi: async (selection) => await enrichPoi(
        prisma, {type: 'node', id: Number(selection.id)}, {
          address: true,
          contact: true,
          openingHours: true,
          fuel: true,
          accessibility: true,
          building: selection.includeGeometry,
          route: false,
          routeGeometry: false,
          photos: true,
          description: true,
        },
        null, 'driving'),
    now: geoCoreHost.now,
  });
  const handler = async (request: any) => {
    const userId = (request.user as {sub?: string} | undefined)?.sub ?? null;
    const isGet = request.method === 'GET';
    const query = (isGet ? request.query : {}) as Record<string, unknown>;
    const body =
        (!isGet ? (request.body as BootstrapBody | undefined) : undefined) ??
        {};

    const includePrefs =
        isGet ? query.includePrefs !== 'false' : body.includePrefs ?? true;
    const includeHistory =
        isGet ? query.includeHistory !== 'false' : body.includeHistory ?? true;
    const includeMap =
        isGet ? query.includeMap !== 'false' : body.includeMap ?? true;
    const historyLimitRaw = isGet ? query.historyLimit : body.historyLimit;
    const historyLimit = Number(historyLimitRaw ?? 80);
    const viewport = isGet ? undefined : body.viewport;
    const selectedPoi = isGet ? undefined : body.selectedPoi;
    const payload = await bootstrap.build({
      userId,
      includePrefs,
      includeHistory,
      includeMap,
      historyLimit,
      viewport,
      selectedPoi,
    });

    const rt = withTelemetryBase(recordTelemetry, request);
    await rt({
      eventType: 'frontend.map.bootstrap',
      source: 'api',
      payload: {
        includePrefs,
        includeHistory,
        includeMap,
        historyLimit: Number.isFinite(historyLimit) ? historyLimit : null,
        viewportRequested: Boolean(viewport?.center),
        selectedPoiRequested: Boolean(selectedPoi?.id),
      },
    });
    return payload;
  };

  server.get('/frontend/map/actions/bootstrap', handler);
  server.post('/frontend/map/actions/bootstrap', handler);
}
