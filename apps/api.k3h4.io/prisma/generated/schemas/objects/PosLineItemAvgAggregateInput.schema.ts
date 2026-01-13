import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  price: z.literal(true).optional()
}).strict();
export const PosLineItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemAvgAggregateInputType>;
export const PosLineItemAvgAggregateInputObjectZodSchema = makeSchema();
