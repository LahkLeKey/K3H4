import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  poiStatus: z.literal(true).optional(),
  centerLat: z.literal(true).optional(),
  centerLng: z.literal(true).optional(),
  error: z.literal(true).optional(),
  userAgent: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const GeoStatusLogMinAggregateInputObjectSchema: z.ZodType<Prisma.GeoStatusLogMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogMinAggregateInputType>;
export const GeoStatusLogMinAggregateInputObjectZodSchema = makeSchema();
