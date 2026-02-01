import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  osmType: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  category: SortOrderSchema.optional(),
  lastSeenAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ActorMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActorMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorMaxOrderByAggregateInput>;
export const ActorMaxOrderByAggregateInputObjectZodSchema = makeSchema();
