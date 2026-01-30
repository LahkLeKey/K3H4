import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopWhereInputObjectSchema as GeoDirectionStopWhereInputObjectSchema } from './GeoDirectionStopWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoDirectionStopWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoDirectionStopWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoDirectionStopWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionStopListRelationFilterObjectSchema: z.ZodType<Prisma.GeoDirectionStopListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopListRelationFilter>;
export const GeoDirectionStopListRelationFilterObjectZodSchema = makeSchema();
