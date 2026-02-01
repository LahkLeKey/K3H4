import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  key: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ActorCacheMaxAggregateInputObjectSchema: z.ZodType<Prisma.ActorCacheMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheMaxAggregateInputType>;
export const ActorCacheMaxAggregateInputObjectZodSchema = makeSchema();
