import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCountOutputTypeCountStopsArgsObjectSchema as GeoDirectionCountOutputTypeCountStopsArgsObjectSchema } from './GeoDirectionCountOutputTypeCountStopsArgs.schema';
import { GeoDirectionCountOutputTypeCountSegmentsArgsObjectSchema as GeoDirectionCountOutputTypeCountSegmentsArgsObjectSchema } from './GeoDirectionCountOutputTypeCountSegmentsArgs.schema'

const makeSchema = () => z.object({
  stops: z.union([z.boolean(), z.lazy(() => GeoDirectionCountOutputTypeCountStopsArgsObjectSchema)]).optional(),
  segments: z.union([z.boolean(), z.lazy(() => GeoDirectionCountOutputTypeCountSegmentsArgsObjectSchema)]).optional()
}).strict();
export const GeoDirectionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.GeoDirectionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCountOutputTypeSelect>;
export const GeoDirectionCountOutputTypeSelectObjectZodSchema = makeSchema();
