import {ActorType, EntityDirection, EntityKind, LifecycleStatus, Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {parseLifecycleStatus} from '../lib/status-utils';
import {recordBankTransactionEntity} from '../services/bank-actor';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEFAULT_CHANNEL = 'In-store';
const SOURCE = 'k3h4-api';

const serializeMoney = (value: Prisma.Decimal|null|undefined) =>
    value ? value.toFixed(2) : '0.00';

const parseJsonObject = (value: Prisma.JsonValue|null|undefined) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

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

const parseTicketItems = (value: Prisma.JsonValue|null|undefined) => {
  if (!value || !Array.isArray(value)) return [] as TicketItem[];
  return value
      .map((item) => {
        if (!item || typeof item !== 'object' || Array.isArray(item))
          return null;
        const {name, quantity, price} = item as Record<string, unknown>;
        const itemName = typeof name === 'string' ? name : undefined;
        const itemQuantity = Number.isFinite(Number(quantity)) ?
            Math.max(1, Math.floor(Number(quantity))) :
            1;
        const itemPrice = typeof price === 'string' ? price : undefined;
        if (!itemName || !itemPrice) return null;
        return {name: itemName, quantity: itemQuantity, price: itemPrice};
      })
      .filter((item): item is TicketItem => Boolean(item));
};

const getStoreChannel = (store: Prisma.Actor) => {
  const metadata = parseJsonObject(store.metadata);
  return (metadata.channel as string | undefined) ?? DEFAULT_CHANNEL;
};

const buildStoreSummary = (store: Prisma.Actor) => ({
  id: store.id,
  name: store.label,
  channel: getStoreChannel(store),
});

type TicketRecord = {
  id: string; storeId: string | null; storeName: string | null; channel: string;
  status: LifecycleStatus | null;
  total: Prisma.Decimal;
  createdAt: string;
  items: TicketItem[];
  itemsCount: number;
};

const ticketFromEntity = (entity: Prisma.Entity) => {
  const metadata = parseJsonObject(entity.metadata);
  const amount = typeof metadata.amount === 'string' ? metadata.amount : '0';
  const total = new Prisma.Decimal(amount || '0');
  const storeId =
      typeof metadata.storeId === 'string' ? metadata.storeId : null;
  const storeName =
      typeof metadata.storeName === 'string' ? metadata.storeName : null;
  const channel =
      typeof metadata.channel === 'string' ? metadata.channel : DEFAULT_CHANNEL;
  const status = typeof metadata.status === 'string' ?
      (metadata.status as LifecycleStatus) :
      null;
  const items =
      parseTicketItems(metadata.items as Prisma.JsonValue | null | undefined);
  const itemsCount = typeof metadata.itemsCount === 'number' ?
      metadata.itemsCount :
      items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    id: entity.id,
    storeId,
    storeName,
    channel,
    status,
    total,
    createdAt: entity.createdAt.toISOString(),
    items,
    itemsCount,
  };
};

const buildOrders =
    (tickets: TicketRecord[], storeLookup: Map<string, string|undefined>) => {
      const orders: Record < string, {
        store: string;
        channel: string;
        tickets: number;
        revenue: Prisma.Decimal;
      }
      > = {};
      tickets.forEach((ticket) => {
        const key = `${ticket.storeId ?? 'unknown'}:${ticket.channel}`;
        if (!orders[key]) {
          const fallbackStore = ticket.storeName ??
              storeLookup.get(ticket.storeId ?? '') ?? 'Unknown store';
          orders[key] = {
            store: fallbackStore,
            channel: ticket.channel,
            tickets: 0,
            revenue: new Prisma.Decimal(0),
          };
        }
        orders[key].tickets += 1;
        orders[key].revenue = orders[key].revenue.add(ticket.total);
      });
      return Object.values(orders).map((order) => ({
                                         store: order.store,
                                         channel: order.channel,
                                         tickets: order.tickets,
                                         revenue: serializeMoney(order.revenue),
                                       }));
    };

const buildTopItems = (tickets: TicketRecord[]) => {
  const agg: Record < string, {
    name: string;
    sold: number;
    revenue: Prisma.Decimal
  }
  > = {};
  tickets.forEach((ticket) => {
    ticket.items.forEach((item) => {
      const key =
          item.name.trim().toLowerCase() || `${item.name}:${item.price}`;
      if (!agg[key]) {
        agg[key] = {name: item.name, sold: 0, revenue: new Prisma.Decimal(0)};
      }
      agg[key].sold += item.quantity;
      agg[key].revenue = agg[key].revenue.add(
          new Prisma.Decimal(item.price).mul(item.quantity));
    });
  });
  return Object.values(agg)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
      .map((item) => ({
             name: item.name,
             sold: item.sold,
             revenue: serializeMoney(item.revenue),
           }));
};

const ensureStoreActor = async (
    tx: Prisma.TransactionClient|PrismaClient, userId: string,
    storeId: string|undefined, storeName: string|undefined, channel: string,
    updateChannel: boolean) => {
  if (storeId) {
    const store = await tx.actor.findFirst({
      where: {id: storeId, userId, type: ActorType.POINT_OF_SALE_STORE},
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
      type: ActorType.POINT_OF_SALE_STORE,
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
        const [stores, ticketEntities] = await Promise.all([
          prisma.actor.findMany({
            where: {userId, type: ActorType.POINT_OF_SALE_STORE},
            orderBy: {createdAt: 'desc'},
          }),
          prisma.entity.findMany({
            where: {
              actor: {userId},
              kind: EntityKind.POINT_OF_SALE_TICKET,
            },
            orderBy: {createdAt: 'desc'},
          }),
        ]);

        const storeNames = new Map<string, string>();
        stores.forEach((store) => storeNames.set(store.id, store.label));

        const tickets = ticketEntities.map(ticketFromEntity);
        const gross = tickets.reduce(
            (sum, ticket) => sum.add(ticket.total), new Prisma.Decimal(0));
        const ticketCount = tickets.length;
        const avgTicket =
            ticketCount ? gross.div(ticketCount) : new Prisma.Decimal(0);

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'point-of-sale.overview.fetch',
          source: 'api',
          payload:
              {gross: gross.toFixed(2), ticketCount, storeCount: stores.length},
        });

        return {
          metrics: {
            grossRevenue: serializeMoney(gross),
            tickets: ticketCount,
            avgTicket: serializeMoney(avgTicket),
          },
          orders: buildOrders(tickets, storeNames),
          topItems: buildTopItems(tickets),
          stores: stores.map(buildStoreSummary),
        };
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
        const channel = requestedChannel || DEFAULT_CHANNEL;
        const items = normalizeTicketItems(body.items);
        const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const storeName = body.storeName?.trim() || undefined;
        const storeChannel = channel;
        const channelOverride = requestedChannel !== undefined;

        let ticketStatus = LifecycleStatus.CLOSED;
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
              direction: EntityDirection.CREDIT,
              kind: EntityKind.POINT_OF_SALE_TICKET,
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
        const channel = body.channel?.trim() || DEFAULT_CHANNEL;
        const store = await prisma.actor.create({
          data: {
            userId,
            type: ActorType.POINT_OF_SALE_STORE,
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
        return {store: buildStoreSummary(store)};
      });
}
