import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional(),
  price: SortOrderSchema.optional()
}).strict();
export const PosLineItemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemAvgOrderByAggregateInput>;
export const PosLineItemAvgOrderByAggregateInputObjectZodSchema = makeSchema();
