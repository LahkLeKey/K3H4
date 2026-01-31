import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  profile: z.literal(true).optional(),
  signature: z.literal(true).optional(),
  originLat: z.literal(true).optional(),
  originLng: z.literal(true).optional(),
  destinationLat: z.literal(true).optional(),
  destinationLng: z.literal(true).optional(),
  distanceMeters: z.literal(true).optional(),
  durationSeconds: z.literal(true).optional(),
  statusCode: z.literal(true).optional(),
  statusMessage: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const GeoDirectionMinAggregateInputObjectSchema: z.ZodType<Prisma.GeoDirectionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionMinAggregateInputType>;
export const GeoDirectionMinAggregateInputObjectZodSchema = makeSchema();
