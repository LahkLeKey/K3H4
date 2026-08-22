import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {createPointOfSaleStore, createPointOfSaleTicket, getPointOfSaleOverview, POS_DEFAULT_CHANNEL} from '../kits/point-of-sale';
import {LIFECYCLE_STATUSES, type LifecycleStatus} from '../lib/domain-constants';
import {parseLifecycleStatus} from '../lib/status-utils';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

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
        const storeName = body.storeName?.trim() || undefined;
        const channelOverride = requestedChannel !== undefined;

        let ticketStatus: LifecycleStatus = LIFECYCLE_STATUSES.CLOSED;
        if (body.status !== undefined) {
          const parsedStatus = parseLifecycleStatus(body.status);
          if (!parsedStatus)
            return reply.status(400).send({error: 'Invalid status'});
          ticketStatus = parsedStatus;
        }

        try {
          const ticket = await prisma.$transaction((transaction) =>
            createPointOfSaleTicket(transaction, {
              userId,
              storeId: body.storeId,
              storeName,
              channel,
              updateChannel: channelOverride,
              total: body.total,
              items: body.items,
              status: ticketStatus,
            }));
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'point-of-sale.ticket.create',
            source: 'api',
            payload: {
              channel: ticket.channel,
              items: ticket.itemsCount,
              total: ticket.total,
            },
          });

          return {
            ticket: {...ticket, total: new Prisma.Decimal(ticket.total)},
          };
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
        const store = await createPointOfSaleStore(prisma, {
          userId,
          name: body.name,
          channel,
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'point-of-sale.store.create',
          source: 'api',
          payload: {name: store.name, channel},
        });
        return {store};
      });
}
