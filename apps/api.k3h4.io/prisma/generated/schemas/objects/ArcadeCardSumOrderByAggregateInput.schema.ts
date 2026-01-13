import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  balance: SortOrderSchema.optional()
}).strict();
export const ArcadeCardSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardSumOrderByAggregateInput>;
export const ArcadeCardSumOrderByAggregateInputObjectZodSchema = makeSchema();
