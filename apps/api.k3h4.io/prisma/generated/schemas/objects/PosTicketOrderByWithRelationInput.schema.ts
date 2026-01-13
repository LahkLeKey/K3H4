import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { PosStoreOrderByWithRelationInputObjectSchema as PosStoreOrderByWithRelationInputObjectSchema } from './PosStoreOrderByWithRelationInput.schema';
import { PosLineItemOrderByRelationAggregateInputObjectSchema as PosLineItemOrderByRelationAggregateInputObjectSchema } from './PosLineItemOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  itemsCount: SortOrderSchema.optional(),
  channel: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  store: z.lazy(() => PosStoreOrderByWithRelationInputObjectSchema).optional(),
  lineItems: z.lazy(() => PosLineItemOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const PosTicketOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PosTicketOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketOrderByWithRelationInput>;
export const PosTicketOrderByWithRelationInputObjectZodSchema = makeSchema();
