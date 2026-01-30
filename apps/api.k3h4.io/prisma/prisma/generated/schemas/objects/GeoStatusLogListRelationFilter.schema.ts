import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './GeoStatusLogWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoStatusLogWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoStatusLogWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoStatusLogWhereInputObjectSchema).optional()
}).strict();
export const GeoStatusLogListRelationFilterObjectSchema: z.ZodType<Prisma.GeoStatusLogListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogListRelationFilter>;
export const GeoStatusLogListRelationFilterObjectZodSchema = makeSchema();
