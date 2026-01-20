import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './GeoViewHistoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoViewHistoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoViewHistoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoViewHistoryWhereInputObjectSchema).optional()
}).strict();
export const GeoViewHistoryListRelationFilterObjectSchema: z.ZodType<Prisma.GeoViewHistoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryListRelationFilter>;
export const GeoViewHistoryListRelationFilterObjectZodSchema = makeSchema();
