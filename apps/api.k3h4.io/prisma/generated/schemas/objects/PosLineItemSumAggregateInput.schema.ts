import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  price: z.literal(true).optional()
}).strict();
export const PosLineItemSumAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemSumAggregateInputType>;
export const PosLineItemSumAggregateInputObjectZodSchema = makeSchema();
