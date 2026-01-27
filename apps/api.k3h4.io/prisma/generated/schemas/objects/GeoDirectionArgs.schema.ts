import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './GeoDirectionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoDirectionSelectObjectSchema).optional(),
  include: z.lazy(() => GeoDirectionIncludeObjectSchema).optional()
}).strict();
export const GeoDirectionArgsObjectSchema = makeSchema();
export const GeoDirectionArgsObjectZodSchema = makeSchema();
