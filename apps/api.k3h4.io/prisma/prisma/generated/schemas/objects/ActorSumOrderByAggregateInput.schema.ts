import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  osmId: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional()
}).strict();
export const ActorSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActorSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorSumOrderByAggregateInput>;
export const ActorSumOrderByAggregateInputObjectZodSchema = makeSchema();
