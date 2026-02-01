import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  actorId: z.boolean().optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  key: z.boolean().optional(),
  payload: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ActorCacheSelectObjectSchema: z.ZodType<Prisma.ActorCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheSelect>;
export const ActorCacheSelectObjectZodSchema = makeSchema();
