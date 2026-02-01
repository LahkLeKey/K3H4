import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  label: z.literal(true).optional(),
  type: z.literal(true).optional(),
  note: z.literal(true).optional(),
  source: z.literal(true).optional(),
  osmType: z.literal(true).optional(),
  osmId: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional(),
  category: z.literal(true).optional(),
  lastSeenAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ActorMaxAggregateInputObjectSchema: z.ZodType<Prisma.ActorMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ActorMaxAggregateInputType>;
export const ActorMaxAggregateInputObjectZodSchema = makeSchema();
