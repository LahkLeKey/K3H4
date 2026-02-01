import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityArgsObjectSchema as EntityArgsObjectSchema } from './EntityArgs.schema'

const makeSchema = () => z.object({
  entity: z.union([z.boolean(), z.lazy(() => EntityArgsObjectSchema)]).optional()
}).strict();
export const EntityCacheIncludeObjectSchema: z.ZodType<Prisma.EntityCacheInclude> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheInclude>;
export const EntityCacheIncludeObjectZodSchema = makeSchema();
