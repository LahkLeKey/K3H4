import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  creditsSpent: SortOrderSchema.optional(),
  score: SortOrderSchema.optional()
}).strict();
export const ArcadeSessionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeSessionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionSumOrderByAggregateInput>;
export const ArcadeSessionSumOrderByAggregateInputObjectZodSchema = makeSchema();
