import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  type: z.boolean().optional(),
  signature: z.boolean().optional(),
  params: z.boolean().optional(),
  payload: z.boolean().optional(),
  count: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const GeoQueryCacheSelectObjectSchema: z.ZodType<Prisma.GeoQueryCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheSelect>;
export const GeoQueryCacheSelectObjectZodSchema = makeSchema();
