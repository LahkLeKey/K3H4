import {ActorType, Entity, EntityKind, LifecycleStatus, Prisma, PrismaClient} from '@prisma/client';

export const POS_DEFAULT_CHANNEL = 'In-store';

const serializeMoney = (value: Prisma.Decimal|null|undefined) =>
    value ? value.toFixed(2) : '0.00';

const parseJsonObject = (value: Prisma.JsonValue|null|undefined) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

type TicketItem = {
  name: string; quantity: number; price: string
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
  return (metadata.channel as string | undefined) ?? POS_DEFAULT_CHANNEL;
};

const buildStoreSummary = (store: Prisma.Actor) => ({
  id: store.id,
  name: store.label,
  channel: getStoreChannel(store),
});

export const summarizePointOfSaleStore = buildStoreSummary;

type TicketRecord = {
  id: string; storeId: string | null; storeName: string | null; channel: string;
  status: LifecycleStatus | null;
  total: Prisma.Decimal;
  createdAt: string;
  items: TicketItem[];
  itemsCount: number;
};

const ticketFromEntity = (entity: Prisma.Entity): TicketRecord => {
  const metadata = parseJsonObject(entity.metadata);
  const amount = typeof metadata.amount === 'string' ? metadata.amount : '0';
  const total = new Prisma.Decimal(amount || '0');
  const storeId =
      typeof metadata.storeId === 'string' ? metadata.storeId : null;
  const storeName =
      typeof metadata.storeName === 'string' ? metadata.storeName : null;
  const channel = typeof metadata.channel === 'string' ? metadata.channel :
                                                         POS_DEFAULT_CHANNEL;
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

export type PointOfSaleOrder = {
  store: string; channel: string; tickets: number; revenue: string;
};

export type PointOfSaleTopItem = {
  name: string; sold: number; revenue: string;
};

export type PointOfSaleStoreSummary = ReturnType<typeof buildStoreSummary>;

export type PointOfSaleOverview = {
  metrics: {grossRevenue: string; tickets: number; avgTicket: string;};
  orders: PointOfSaleOrder[];
  topItems: PointOfSaleTopItem[];
  stores: PointOfSaleStoreSummary[];
};

export const getPointOfSaleOverview = async(
    prisma: PrismaClient, userId: string): Promise<PointOfSaleOverview> => {
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
};

export {ticketFromEntity};
