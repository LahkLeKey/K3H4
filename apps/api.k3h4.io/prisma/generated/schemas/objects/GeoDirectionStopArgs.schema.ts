import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './GeoDirectionStopInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoDirectionStopSelectObjectSchema).optional(),
  include: z.lazy(() => GeoDirectionStopIncludeObjectSchema).optional()
}).strict();
export const GeoDirectionStopArgsObjectSchema = makeSchema();
export const GeoDirectionStopArgsObjectZodSchema = makeSchema();
