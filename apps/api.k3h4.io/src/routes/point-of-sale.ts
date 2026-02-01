import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {recordBankTransactionEntity} from '../actors/Bank/Bank';
import {getPointOfSaleOverview, POS_DEFAULT_CHANNEL, summarizePointOfSaleStore, ticketFromEntity,} from '../entities/PointOfSale/PointOfSale';
import {ACTOR_TYPES, ENTITY_DIRECTIONS, ENTITY_KINDS} from '../lib/actor-entity-constants';
import {LIFECYCLE_STATUSES, type LifecycleStatus} from '../lib/domain-constants';
import {parseLifecycleStatus} from '../lib/status-utils';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const SOURCE = 'k3h4-api';

type TicketItem = {
  name: string; quantity: number; price: string
};

const normalizeTicketItems =
    (items?: Array<{name: string; quantity?: number; price: number}>):
        TicketItem[] => {
          if (!items) return [];
          return items
              .map((item) => {
                const name = item?.name?.trim();
                const quantity = Number.isFinite(item?.quantity ?? 1) ?
                    Math.max(1, Math.floor(Number(item.quantity ?? 1))) :
                    1;
                const parsedPrice = Number(item?.price);
                if (!name || !Number.isFinite(parsedPrice)) return null;
                const price =
                    new Prisma.Decimal(parsedPrice.toFixed(2)).toFixed(2);
                return {name, quantity, price};
              })
              .filter((item): item is TicketItem => Boolean(item));
        };

const parseJsonObject =
    (value: Prisma.JsonValue|null|undefined): Prisma.JsonObject => {
      if (!value || typeof value !== 'object' || Array.isArray(value))
        return {};
      return value as Prisma.JsonObject;
    };

const ensureStoreActor = async (
    tx: Prisma.TransactionClient|PrismaClient, userId: string,
    storeId: string|undefined, storeName: string|undefined, channel: string,
    updateChannel: boolean) => {
  if (storeId) {
    const store = await tx.actor.findFirst({
      where: {id: storeId, userId, type: ACTOR_TYPES.POINT_OF_SALE_STORE},
    });
    if (store) {
      if (updateChannel) {
        const metadata = parseJsonObject(store.metadata);
        metadata.channel = channel;
        return tx.actor.update({
          where: {id: store.id},
          data: {metadata, source: SOURCE},
        });
      }
      return store;
    }
  }
  if (!storeName) return null;
  return tx.actor.create({
    data: {
      userId,
      type: ACTOR_TYPES.POINT_OF_SALE_STORE,
      label: storeName,
      metadata: {channel},
      source: SOURCE,
    },
  });
};

export function registerPointOfSaleRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/point-of-sale/overview', {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const overview = await getPointOfSaleOverview(prisma, userId);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'point-of-sale.overview.fetch',
          source: 'api',
          payload: {
            gross: overview.metrics.grossRevenue,
            ticketCount: overview.metrics.tickets,
            storeCount: overview.stores.length,
          },
        });
        return overview;
      });

  server.post(
      '/point-of-sale/tickets', {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          storeId?: string;
          storeName?: string;
          channel?: string;
          total: number;
          items?: Array<{name: string; quantity?: number; price: number}>;
          status?: string;
        };

        if (!body?.total)
          return reply.status(400).send({error: 'total is required'});

        const requestedChannel = body.channel?.trim();
        const channel = requestedChannel || POS_DEFAULT_CHANNEL;
        const items = normalizeTicketItems(body.items);
        const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const storeName = body.storeName?.trim() || undefined;
        const storeChannel = channel;
        const channelOverride = requestedChannel !== undefined;

        let ticketStatus: LifecycleStatus = LIFECYCLE_STATUSES.CLOSED;
        if (body.status !== undefined) {
          const parsedStatus = parseLifecycleStatus(body.status);
          if (!parsedStatus)
            return reply.status(400).send({error: 'Invalid status'});
          ticketStatus = parsedStatus;
        }

        try {
          const {entity, store} = await prisma.$transaction(async (tx) => {
            const storeEntry = await ensureStoreActor(
                tx, userId, body.storeId, storeName, storeChannel,
                channelOverride);
            if (!storeEntry) throw new Error('storeId or storeName required');

            const user = await tx.user.findUnique({
              where: {id: userId},
              select: {k3h4CoinBalance: true},
            });
            if (!user) throw new Error('User not found');

            const total = new Prisma.Decimal(Number(body.total).toFixed(2));
            const nextBalance = user.k3h4CoinBalance.add(total);
            await tx.user.update({
              where: {id: userId},
              data: {k3h4CoinBalance: nextBalance},
            });

            const entity = await recordBankTransactionEntity(tx, {
              userId,
              amount: total,
              direction: ENTITY_DIRECTIONS.CREDIT,
              kind: ENTITY_KINDS.POINT_OF_SALE_TICKET,
              balanceAfter: nextBalance,
              targetType: 'point-of-sale_store',
              targetId: storeEntry.id,
              name: ['Point of Sale (Arcade Ticket)', storeEntry.label, channel]
                        .filter(Boolean)
                        .join(' · '),
              metadata: {
                storeId: storeEntry.id,
                storeName: storeEntry.label,
                channel,
                status: ticketStatus,
                itemsCount,
                items,
              },
            });
            return {entity, store: storeEntry};
          });

          const ticket = ticketFromEntity(entity);
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'point-of-sale.ticket.create',
            source: 'api',
            payload: {
              channel: ticket.channel,
              items: ticket.itemsCount,
              total: ticket.total.toFixed(2),
            },
          });

          return {ticket};
        } catch (err) {
          request.log.error({err}, 'point of sale ticket creation failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to create ticket'
          });
        }
      });

  server.post(
      '/point-of-sale/stores', {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          name: string;
          channel?: string
        };
        const channel = body.channel?.trim() || POS_DEFAULT_CHANNEL;
        const store = await prisma.actor.create({
          data: {
            userId,
            type: ACTOR_TYPES.POINT_OF_SALE_STORE,
            label: body.name,
            metadata: {channel},
            source: SOURCE,
          },
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'point-of-sale.store.create',
          source: 'api',
          payload: {name: store.label, channel},
        });
        return {store: summarizePointOfSaleStore(store)};
      });
}
