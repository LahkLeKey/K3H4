import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  osmType: z.literal(true).optional(),
  osmId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  category: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  source: z.literal(true).optional(),
  lastSeenAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  buildingId: z.literal(true).optional()
}).strict();
export const PoiMinAggregateInputObjectSchema: z.ZodType<Prisma.PoiMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PoiMinAggregateInputType>;
export const PoiMinAggregateInputObjectZodSchema = makeSchema();
