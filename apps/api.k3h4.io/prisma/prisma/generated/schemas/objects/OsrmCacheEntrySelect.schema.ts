import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actorId: z.boolean().optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  service: z.boolean().optional(),
  profile: z.boolean().optional(),
  coordinates: z.boolean().optional(),
  params: z.boolean().optional(),
  paramsHash: z.boolean().optional(),
  signature: z.boolean().optional(),
  url: z.boolean().optional(),
  statusCode: z.boolean().optional(),
  payload: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const OsrmCacheEntrySelectObjectSchema: z.ZodType<Prisma.OsrmCacheEntrySelect> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntrySelect>;
export const OsrmCacheEntrySelectObjectZodSchema = makeSchema();
