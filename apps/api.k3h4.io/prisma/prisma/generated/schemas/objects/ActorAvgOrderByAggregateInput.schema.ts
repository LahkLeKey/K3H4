import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  osmId: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional()
}).strict();
export const ActorAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActorAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorAvgOrderByAggregateInput>;
export const ActorAvgOrderByAggregateInputObjectZodSchema = makeSchema();
