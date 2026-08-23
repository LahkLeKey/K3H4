import {Prisma, type PrismaClient} from '@prisma/client';

import {createFreightLoad, findFreightLoad, loadFreightLoads, markFreightLoadCompleted} from '../../actors/Freight/Freight';
import {recordBankLedgerEntry} from '../bank-ledger';
import {ENTITY_DIRECTIONS, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {LIFECYCLE_STATUSES} from '../../lib/domain-constants';
import {fetchOsrm} from '../../lib/osrm-client';
import {readGeoDirectionCache, writeGeoDirectionCache} from '../../services/geo-direction-cache';
import {createPrismaGeoCoreKit} from '../geo-core/prisma-adapter';

import {createFreightRoutingKit, type FreightDirection, type FreightLoad, type FreightRoutingHost} from './index';

const createPrismaFreightRoutingHost =
  (prisma: PrismaClient, resolveGeoActorId: (userId: string) => Promise<string>): FreightRoutingHost => ({
      listLoads: async (userId) => await loadFreightLoads(prisma, userId),
      async createLoad(command) {
        return await createFreightLoad(prisma, {
          userId: command.userId,
          title: command.title,
          originName: command.originName,
          originLat: command.origin.lat,
          originLng: command.origin.lng,
          destinationName: command.destinationName,
          destinationLat: command.destination.lat,
          destinationLng: command.destination.lng,
          distanceKm: command.distanceKm,
          durationMinutes: command.durationMinutes,
          cost: new Prisma.Decimal(command.cost),
          routeGeoJson: command.routeGeoJson,
          status: LIFECYCLE_STATUSES.PLANNING,
        });
      },
      findLoad: async (userId, loadId) =>
        await findFreightLoad(prisma, userId, loadId),
      async completeLoadAtomically(userId: string, load: FreightLoad) {
        return await prisma.$transaction(async (transaction) => {
          const user = await transaction.user.findUnique({
            where: {id: userId},
            select: {k3h4CoinBalance: true},
          });
          if (!user) throw new Error('User not found');

          const cost = new Prisma.Decimal(load.cost);
          const nextBalance = user.k3h4CoinBalance.sub(cost);
          const savedUser = await transaction.user.update({
            where: {id: userId},
            data: {k3h4CoinBalance: nextBalance},
          });
          await recordBankLedgerEntry(transaction, {
            userId,
            amount: cost.toFixed(2),
            direction: ENTITY_DIRECTIONS.DEBIT,
            kind: ENTITY_KINDS.FREIGHT_PAYMENT,
            note: `Freight load ${load.title}`,
            balanceAfter: savedUser.k3h4CoinBalance.toFixed(2),
            targetType: 'freight_load',
            targetId: load.id,
            name: load.title,
          });
          return await markFreightLoadCompleted(transaction, load.id);
        });
      },
      resolveGeoActorId,
      async readDirection(actorId, signature) {
        return await readGeoDirectionCache(prisma, actorId, signature) as
            FreightDirection|null;
      },
      async writeDirection(actorId, direction) {
        await writeGeoDirectionCache(prisma, actorId, direction);
      },
      async fetchDirections(origin, destination) {
        const coordinates =
            `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
        const response = await fetchOsrm({
          service: 'route',
          profile: 'driving',
          coordinates,
          params: {
            overview: 'full',
            geometries: 'geojson',
            steps: true,
            annotations: 'duration,distance',
            continue_straight: true,
          },
        });
        if (!response.ok) throw new Error(`OSRM ${response.status}`);
        const route = response.body?.routes?.[0];
        if (!route?.distance || !route?.duration) {
          throw new Error('Route unavailable');
        }
        return route;
      },
      now: () => new Date(),
    });

export const createPrismaFreightRoutingKit = (
    prisma: PrismaClient,
    resolveGeoActorId: (userId: string) => Promise<string>) =>
  createFreightRoutingKit({
    geoCore: createPrismaGeoCoreKit(prisma),
    host: createPrismaFreightRoutingHost(prisma, resolveGeoActorId),
  });