import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const ArcadeTopUpAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpAvgOrderByAggregateInput>;
export const ArcadeTopUpAvgOrderByAggregateInputObjectZodSchema = makeSchema();
