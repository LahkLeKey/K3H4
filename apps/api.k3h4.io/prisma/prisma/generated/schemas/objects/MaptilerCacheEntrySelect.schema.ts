import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ActorArgsObjectSchema as ActorArgsObjectSchema } from './ActorArgs.schema';
import { MaptilerQueryArgsObjectSchema as MaptilerQueryArgsObjectSchema } from './MaptilerQueryArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  actorId: z.boolean().optional(),
  actor: z.union([z.boolean(), z.lazy(() => ActorArgsObjectSchema)]).optional(),
  queryId: z.boolean().optional(),
  query: z.union([z.boolean(), z.lazy(() => MaptilerQueryArgsObjectSchema)]).optional(),
  kind: z.boolean().optional(),
  path: z.boolean().optional(),
  params: z.boolean().optional(),
  paramsHash: z.boolean().optional(),
  signature: z.boolean().optional(),
  method: z.boolean().optional(),
  responseType: z.boolean().optional(),
  url: z.boolean().optional(),
  statusCode: z.boolean().optional(),
  payload: z.boolean().optional(),
  data: z.boolean().optional(),
  contentType: z.boolean().optional(),
  cacheControl: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const MaptilerCacheEntrySelectObjectSchema: z.ZodType<Prisma.MaptilerCacheEntrySelect> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntrySelect>;
export const MaptilerCacheEntrySelectObjectZodSchema = makeSchema();
