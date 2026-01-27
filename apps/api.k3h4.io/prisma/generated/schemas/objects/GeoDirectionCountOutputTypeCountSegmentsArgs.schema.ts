import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentWhereInputObjectSchema as GeoDirectionSegmentWhereInputObjectSchema } from './GeoDirectionSegmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionSegmentWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionCountOutputTypeCountSegmentsArgsObjectSchema = makeSchema();
export const GeoDirectionCountOutputTypeCountSegmentsArgsObjectZodSchema = makeSchema();
