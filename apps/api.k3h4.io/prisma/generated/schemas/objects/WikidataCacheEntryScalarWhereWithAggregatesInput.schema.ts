import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const wikidatacacheentryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => WikidataCacheEntryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => WikidataCacheEntryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WikidataCacheEntryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WikidataCacheEntryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => WikidataCacheEntryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  resource: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  endpoint: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  statusCode: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cacheControlSeconds: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  etag: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const WikidataCacheEntryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryScalarWhereWithAggregatesInput> = wikidatacacheentryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.WikidataCacheEntryScalarWhereWithAggregatesInput>;
export const WikidataCacheEntryScalarWhereWithAggregatesInputObjectZodSchema = wikidatacacheentryscalarwherewithaggregatesinputSchema;
