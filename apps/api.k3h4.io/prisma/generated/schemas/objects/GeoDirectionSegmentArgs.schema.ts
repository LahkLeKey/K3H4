import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentIncludeObjectSchema as GeoDirectionSegmentIncludeObjectSchema } from './GeoDirectionSegmentInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoDirectionSegmentSelectObjectSchema).optional(),
  include: z.lazy(() => GeoDirectionSegmentIncludeObjectSchema).optional()
}).strict();
export const GeoDirectionSegmentArgsObjectSchema = makeSchema();
export const GeoDirectionSegmentArgsObjectZodSchema = makeSchema();
