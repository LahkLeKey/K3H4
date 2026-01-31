import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { BytesNullableWithAggregatesFilterObjectSchema as BytesNullableWithAggregatesFilterObjectSchema } from './BytesNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const maptilercacheentryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => MaptilerCacheEntryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MaptilerCacheEntryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaptilerCacheEntryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaptilerCacheEntryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MaptilerCacheEntryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  actorId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  queryId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  kind: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  path: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  method: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  responseType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  statusCode: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  data: z.union([z.lazy(() => BytesNullableWithAggregatesFilterObjectSchema), z.instanceof(Uint8Array)]).optional().nullable(),
  contentType: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  cacheControl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  fetchedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MaptilerCacheEntryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryScalarWhereWithAggregatesInput> = maptilercacheentryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MaptilerCacheEntryScalarWhereWithAggregatesInput>;
export const MaptilerCacheEntryScalarWhereWithAggregatesInputObjectZodSchema = maptilercacheentryscalarwherewithaggregatesinputSchema;
