import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionArgsObjectSchema as GeoDirectionArgsObjectSchema } from './GeoDirectionArgs.schema'

const makeSchema = () => z.object({
  direction: z.union([z.boolean(), z.lazy(() => GeoDirectionArgsObjectSchema)]).optional()
}).strict();
export const GeoDirectionSegmentIncludeObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentInclude> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentInclude>;
export const GeoDirectionSegmentIncludeObjectZodSchema = makeSchema();
