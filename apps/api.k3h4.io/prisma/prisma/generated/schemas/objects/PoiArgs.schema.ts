import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './PoiSelect.schema';
import { PoiIncludeObjectSchema as PoiIncludeObjectSchema } from './PoiInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PoiSelectObjectSchema).optional(),
  include: z.lazy(() => PoiIncludeObjectSchema).optional()
}).strict();
export const PoiArgsObjectSchema = makeSchema();
export const PoiArgsObjectZodSchema = makeSchema();
