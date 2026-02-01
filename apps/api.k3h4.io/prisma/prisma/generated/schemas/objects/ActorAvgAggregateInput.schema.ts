import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  osmId: z.literal(true).optional(),
  latitude: z.literal(true).optional(),
  longitude: z.literal(true).optional()
}).strict();
export const ActorAvgAggregateInputObjectSchema: z.ZodType<Prisma.ActorAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ActorAvgAggregateInputType>;
export const ActorAvgAggregateInputObjectZodSchema = makeSchema();
