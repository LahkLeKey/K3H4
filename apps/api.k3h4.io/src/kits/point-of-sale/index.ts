import {Prisma, type PrismaClient} from '@prisma/client';

import {recordBankLedgerEntry} from '../bank-ledger';
import {ACTOR_TYPES, ENTITY_DIRECTIONS, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {LIFECYCLE_STATUSES, type LifecycleStatus} from '../../lib/domain-constants';

export {getPointOfSaleOverview, type PointOfSaleOrder, type PointOfSaleOverview, type PointOfSaleStoreSummary, type PointOfSaleTopItem, POS_DEFAULT_CHANNEL,} from '../../entities/PointOfSale/PointOfSale';

const SOURCE = 'k3h4-api';
const DEFAULT_CHANNEL = 'In-store';

type PointOfSaleTransaction = PrismaClient|Prisma.TransactionClient;

export type PointOfSaleTicketItemInput = {
	name: string;
	quantity?: number;
	price: number;
};

export type CreatePointOfSaleTicketCommand = {
	userId: string;
	storeId?: string;
	storeName?: string;
	channel?: string;
	updateChannel?: boolean;
	total: number|string;
	items?: PointOfSaleTicketItemInput[];
	status?: LifecycleStatus;
};

const normalizeTicketItems = (items: PointOfSaleTicketItemInput[] = []) =>
	items.map((item) => ({
		name: item.name.trim(),
		quantity: Number.isFinite(item.quantity ?? 1) ?
			Math.max(1, Math.floor(Number(item.quantity ?? 1))) : 1,
		price: new Prisma.Decimal(Number(item.price).toFixed(2)).toFixed(2),
	})).filter((item) => item.name && Number.isFinite(Number(item.price)));

const parseJsonObject = (value: Prisma.JsonValue|null|undefined) =>
	value && typeof value === 'object' && !Array.isArray(value) ?
		value as Prisma.JsonObject : {};

const resolveStore = async(
		transaction: PointOfSaleTransaction,
		command: CreatePointOfSaleTicketCommand,
		channel: string) => {
	if (command.storeId) {
		const store = await transaction.actor.findFirst({
			where: {
				id: command.storeId,
				userId: command.userId,
				type: ACTOR_TYPES.POINT_OF_SALE_STORE,
			},
		});
		if (store) {
			if (!command.updateChannel) return store;
			return transaction.actor.update({
				where: {id: store.id},
				data: {
					metadata: {...parseJsonObject(store.metadata), channel},
					source: SOURCE,
				},
			});
		}
	}
	if (!command.storeName) throw new Error('storeId or storeName required');
	return transaction.actor.create({
		data: {
			userId: command.userId,
			type: ACTOR_TYPES.POINT_OF_SALE_STORE,
			label: command.storeName,
			metadata: {channel},
			source: SOURCE,
		},
	});
};

export async function createPointOfSaleTicket(
		transaction: PointOfSaleTransaction,
		command: CreatePointOfSaleTicketCommand) {
	const channel = command.channel?.trim() || DEFAULT_CHANNEL;
	const store = await resolveStore(transaction, command, channel);
	const user = await transaction.user.findUnique({
		where: {id: command.userId},
		select: {k3h4CoinBalance: true},
	});
	if (!user) throw new Error('User not found');

	const total = new Prisma.Decimal(String(command.total));
	const nextBalance = user.k3h4CoinBalance.add(total);
	await transaction.user.update({
		where: {id: command.userId},
		data: {k3h4CoinBalance: nextBalance},
	});

	const items = normalizeTicketItems(command.items);
	const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const status = command.status ?? LIFECYCLE_STATUSES.CLOSED;
	const receipt = await recordBankLedgerEntry(transaction, {
		userId: command.userId,
		amount: total.toFixed(2),
		direction: ENTITY_DIRECTIONS.CREDIT,
		kind: ENTITY_KINDS.POINT_OF_SALE_TICKET,
		balanceAfter: nextBalance.toFixed(2),
		targetType: 'point-of-sale_store',
		targetId: store.id,
		name: ['Point of Sale (Arcade Ticket)', store.label, channel]
				.filter(Boolean)
				.join(' · '),
		details: {
			storeId: store.id,
			storeName: store.label,
			channel,
			status,
			itemsCount,
			items,
		},
	});

	return {
		id: receipt.id,
		storeId: store.id,
		storeName: store.label,
		channel,
		status,
		total: total.toFixed(2),
		createdAt: receipt.createdAt,
		items,
		itemsCount,
	};
}

export async function createPointOfSaleStore(
		transaction: PointOfSaleTransaction,
		command: {userId: string; name: string; channel?: string}) {
	const channel = command.channel?.trim() || DEFAULT_CHANNEL;
	const store = await transaction.actor.create({
		data: {
			userId: command.userId,
			type: ACTOR_TYPES.POINT_OF_SALE_STORE,
			label: command.name,
			metadata: {channel},
			source: SOURCE,
		},
	});
	return {id: store.id, name: store.label, channel};
}
