import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityArgsObjectSchema as EntityArgsObjectSchema } from './EntityArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  entityId: z.boolean().optional(),
  entity: z.union([z.boolean(), z.lazy(() => EntityArgsObjectSchema)]).optional(),
  key: z.boolean().optional(),
  payload: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const EntityCacheSelectObjectSchema: z.ZodType<Prisma.EntityCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheSelect>;
export const EntityCacheSelectObjectZodSchema = makeSchema();
