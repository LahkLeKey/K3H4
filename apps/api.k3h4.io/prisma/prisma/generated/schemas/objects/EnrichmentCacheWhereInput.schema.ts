import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const enrichmentcachewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EnrichmentCacheWhereInputObjectSchema), z.lazy(() => EnrichmentCacheWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EnrichmentCacheWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EnrichmentCacheWhereInputObjectSchema), z.lazy(() => EnrichmentCacheWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  namespace: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sourceKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  paramsHash: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  wikidataId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const EnrichmentCacheWhereInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheWhereInput> = enrichmentcachewhereinputSchema as unknown as z.ZodType<Prisma.EnrichmentCacheWhereInput>;
export const EnrichmentCacheWhereInputObjectZodSchema = enrichmentcachewhereinputSchema;
