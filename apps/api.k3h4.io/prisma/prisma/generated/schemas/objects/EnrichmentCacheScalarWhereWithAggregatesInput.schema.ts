import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const enrichmentcachescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => EnrichmentCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EnrichmentCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EnrichmentCacheScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EnrichmentCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EnrichmentCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  namespace: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sourceKey: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  paramsHash: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  wikidataId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const EnrichmentCacheScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheScalarWhereWithAggregatesInput> = enrichmentcachescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.EnrichmentCacheScalarWhereWithAggregatesInput>;
export const EnrichmentCacheScalarWhereWithAggregatesInputObjectZodSchema = enrichmentcachescalarwherewithaggregatesinputSchema;
