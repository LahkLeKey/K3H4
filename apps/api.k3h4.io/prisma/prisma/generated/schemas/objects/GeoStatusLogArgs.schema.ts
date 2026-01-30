import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './GeoStatusLogSelect.schema';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './GeoStatusLogInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoStatusLogSelectObjectSchema).optional(),
  include: z.lazy(() => GeoStatusLogIncludeObjectSchema).optional()
}).strict();
export const GeoStatusLogArgsObjectSchema = makeSchema();
export const GeoStatusLogArgsObjectZodSchema = makeSchema();
