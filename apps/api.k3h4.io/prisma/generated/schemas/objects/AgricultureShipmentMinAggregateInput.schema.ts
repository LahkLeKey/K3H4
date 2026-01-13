import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  lot: z.literal(true).optional(),
  destination: z.literal(true).optional(),
  mode: z.literal(true).optional(),
  eta: z.literal(true).optional(),
  freightLoadId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgricultureShipmentMinAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentMinAggregateInputType>;
export const AgricultureShipmentMinAggregateInputObjectZodSchema = makeSchema();
