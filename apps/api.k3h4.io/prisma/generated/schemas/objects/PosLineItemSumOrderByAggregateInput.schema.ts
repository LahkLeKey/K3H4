import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional(),
  price: SortOrderSchema.optional()
}).strict();
export const PosLineItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemSumOrderByAggregateInput>;
export const PosLineItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
