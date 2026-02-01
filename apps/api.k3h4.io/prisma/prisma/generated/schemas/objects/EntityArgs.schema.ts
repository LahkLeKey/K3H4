import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntitySelectObjectSchema as EntitySelectObjectSchema } from './EntitySelect.schema';
import { EntityIncludeObjectSchema as EntityIncludeObjectSchema } from './EntityInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EntitySelectObjectSchema).optional(),
  include: z.lazy(() => EntityIncludeObjectSchema).optional()
}).strict();
export const EntityArgsObjectSchema = makeSchema();
export const EntityArgsObjectZodSchema = makeSchema();
