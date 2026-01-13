import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  costCoins: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional()
}).strict();
export const ArcadePrizeAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeAvgOrderByAggregateInput>;
export const ArcadePrizeAvgOrderByAggregateInputObjectZodSchema = makeSchema();
