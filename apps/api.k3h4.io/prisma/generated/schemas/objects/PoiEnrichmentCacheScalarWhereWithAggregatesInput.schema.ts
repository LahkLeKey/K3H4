import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const poienrichmentcachescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  includeHash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheScalarWhereWithAggregatesInput> = poienrichmentcachescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PoiEnrichmentCacheScalarWhereWithAggregatesInput>;
export const PoiEnrichmentCacheScalarWhereWithAggregatesInputObjectZodSchema = poienrichmentcachescalarwherewithaggregatesinputSchema;
