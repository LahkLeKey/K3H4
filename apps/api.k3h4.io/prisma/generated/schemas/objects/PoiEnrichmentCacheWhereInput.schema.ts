import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const poienrichmentcachewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PoiEnrichmentCacheWhereInputObjectSchema), z.lazy(() => PoiEnrichmentCacheWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PoiEnrichmentCacheWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PoiEnrichmentCacheWhereInputObjectSchema), z.lazy(() => PoiEnrichmentCacheWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  includeHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PoiEnrichmentCacheWhereInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheWhereInput> = poienrichmentcachewhereinputSchema as unknown as z.ZodType<Prisma.PoiEnrichmentCacheWhereInput>;
export const PoiEnrichmentCacheWhereInputObjectZodSchema = poienrichmentcachewhereinputSchema;
