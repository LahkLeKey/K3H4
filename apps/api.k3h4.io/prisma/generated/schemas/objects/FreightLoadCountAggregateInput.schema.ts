import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  originName: z.literal(true).optional(),
  originLat: z.literal(true).optional(),
  originLng: z.literal(true).optional(),
  destinationName: z.literal(true).optional(),
  destinationLat: z.literal(true).optional(),
  destinationLng: z.literal(true).optional(),
  distanceKm: z.literal(true).optional(),
  durationMinutes: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  status: z.literal(true).optional(),
  routeGeoJson: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const FreightLoadCountAggregateInputObjectSchema: z.ZodType<Prisma.FreightLoadCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCountAggregateInputType>;
export const FreightLoadCountAggregateInputObjectZodSchema = makeSchema();
