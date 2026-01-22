import { Prisma, PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { buildTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const serializeMoney = (value: Prisma.Decimal | null | undefined) => value ? value.toFixed(2) : "0.00";

export function registerPosRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/pos/overview",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;

      const [stores, tickets, lineItems] = await Promise.all([
        prisma.posStore.findMany({ where: { userId } }),
        prisma.posTicket.findMany({ where: { userId }, include: { store: true } }),
        prisma.posLineItem.findMany({ where: { ticket: { userId } }, include: { ticket: true } }),
      ]);

      type TicketWithStore = Prisma.PosTicketGetPayload<{ include: { store: true } }>;
      type LineItemWithTicket = Prisma.PosLineItemGetPayload<{ include: { ticket: true } }>;

      const gross = tickets.reduce<number>((sum: number, t: TicketWithStore) => sum + Number(t.total), 0);
      const ticketCount = tickets.length;
      const avgTicket = ticketCount ? gross / ticketCount : 0;

      const orders = tickets.reduce<Record<string, { store: string; channel: string; tickets: number; revenue: number }>>((acc: Record<string, { store: string; channel: string; tickets: number; revenue: number }>, ticket: TicketWithStore) => {
        const key = `${ticket.storeId}:${ticket.channel}`;
        if (!acc[key]) {
          acc[key] = {
            store: ticket.store?.name ?? "Unknown store",
            channel: ticket.channel,
            tickets: 0,
            revenue: 0,
          };
        }
        acc[key].tickets += 1;
        acc[key].revenue += Number(ticket.total);
        return acc;
      }, {});

      const itemAgg = lineItems.reduce<Record<string, { name: string; sold: number; revenue: number }>>((acc: Record<string, { name: string; sold: number; revenue: number }>, item: LineItemWithTicket) => {
        const key = item.name.trim().toLowerCase() || item.id;
        if (!acc[key]) acc[key] = { name: item.name, sold: 0, revenue: 0 };
        acc[key].sold += item.quantity;
        acc[key].revenue += Number(item.price) * item.quantity;
        return acc;
      }, {});

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "pos.overview.fetch",
        source: "api",
        payload: { gross, ticketCount, storeCount: stores.length },
      });

      return {
        metrics: {
          grossRevenue: serializeMoney(new Prisma.Decimal(gross || 0)),
          tickets: ticketCount,
          avgTicket: serializeMoney(new Prisma.Decimal(avgTicket || 0)),
        },
        orders: (Object.values(orders) as Array<{ store: string; channel: string; tickets: number; revenue: number }>).map((o) => ({
          store: o.store,
          channel: o.channel,
          tickets: o.tickets,
          revenue: serializeMoney(new Prisma.Decimal(o.revenue || 0)),
        })),
        topItems: (Object.values(itemAgg) as Array<{ name: string; sold: number; revenue: number }>)
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10)
          .map((item) => ({
            name: item.name,
            sold: item.sold,
            revenue: serializeMoney(new Prisma.Decimal(item.revenue || 0)),
          })),
        stores,
      };
    },
  );

  server.post(
    "/pos/tickets",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        storeId?: string;
        storeName?: string;
        channel?: string;
        total: number;
        items?: Array<{ name: string; quantity?: number; price: number }>;
        status?: string;
      };

      if (!body?.total) return reply.status(400).send({ error: "total is required" });

      const channel = body.channel || "In-store";
      const storeId = body.storeId || undefined;
      const storeName = body.storeName?.trim() || undefined;

      const store = storeId
        ? await prisma.posStore.findFirst({ where: { id: storeId, userId } })
        : storeName
        ? await prisma.posStore.upsert({
            where: { userId_name: { userId, name: storeName } },
            update: { channel },
            create: { userId, name: storeName, channel },
          })
        : null;

      const finalStoreId = store?.id || storeId;
      if (!finalStoreId) return reply.status(400).send({ error: "storeId or storeName required" });

      const items = body.items || [];
      const total = new Prisma.Decimal(Number(body.total).toFixed(2));

      const ticket = await prisma.posTicket.create({
        data: {
          userId,
          storeId: finalStoreId,
          channel,
          total,
          itemsCount: items.reduce<number>((sum, i) => sum + (i.quantity ?? 1), 0),
          status: body.status || "closed",
          lineItems: {
            create: items.map((item) => ({
              name: item.name,
              quantity: item.quantity ?? 1,
              price: new Prisma.Decimal(Number(item.price).toFixed(2)),
            })),
          },
        },
        include: { lineItems: true },
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "pos.ticket.create",
        source: "api",
        payload: { channel, items: ticket.itemsCount, total: ticket.total.toFixed(2) },
      });

      return { ticket };
    },
  );

  server.post(
    "/pos/stores",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { name: string; channel?: string };
      const store = await prisma.posStore.create({ data: { userId, name: body.name, channel: body.channel || "In-store" } });
      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "pos.store.create",
        source: "api",
        payload: { name: store.name, channel: store.channel },
      });
      return { store };
    },
  );
}
