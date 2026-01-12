import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { PosTicketOrderByRelationAggregateInputObjectSchema as PosTicketOrderByRelationAggregateInputObjectSchema } from './PosTicketOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  channel: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  tickets: z.lazy(() => PosTicketOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const PosStoreOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PosStoreOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreOrderByWithRelationInput>;
export const PosStoreOrderByWithRelationInputObjectZodSchema = makeSchema();
