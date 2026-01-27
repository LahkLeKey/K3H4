import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCountOutputTypeSelectObjectSchema as GeoDirectionCountOutputTypeSelectObjectSchema } from './GeoDirectionCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoDirectionCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const GeoDirectionCountOutputTypeArgsObjectSchema = makeSchema();
export const GeoDirectionCountOutputTypeArgsObjectZodSchema = makeSchema();
