import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  balance: SortOrderSchema.optional()
}).strict();
export const ArcadeCardAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardAvgOrderByAggregateInput>;
export const ArcadeCardAvgOrderByAggregateInputObjectZodSchema = makeSchema();
