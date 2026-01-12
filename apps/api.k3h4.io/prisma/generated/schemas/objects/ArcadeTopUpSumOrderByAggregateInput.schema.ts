import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const ArcadeTopUpSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpSumOrderByAggregateInput>;
export const ArcadeTopUpSumOrderByAggregateInputObjectZodSchema = makeSchema();
