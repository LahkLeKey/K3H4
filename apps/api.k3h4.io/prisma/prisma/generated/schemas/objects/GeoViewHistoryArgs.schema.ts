import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './GeoViewHistorySelect.schema';
import { GeoViewHistoryIncludeObjectSchema as GeoViewHistoryIncludeObjectSchema } from './GeoViewHistoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoViewHistorySelectObjectSchema).optional(),
  include: z.lazy(() => GeoViewHistoryIncludeObjectSchema).optional()
}).strict();
export const GeoViewHistoryArgsObjectSchema = makeSchema();
export const GeoViewHistoryArgsObjectZodSchema = makeSchema();
