import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const wikidatacacheentrywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WikidataCacheEntryWhereInputObjectSchema), z.lazy(() => WikidataCacheEntryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WikidataCacheEntryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WikidataCacheEntryWhereInputObjectSchema), z.lazy(() => WikidataCacheEntryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  resource: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  endpoint: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  statusCode: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cacheControlSeconds: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  etag: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const WikidataCacheEntryWhereInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryWhereInput> = wikidatacacheentrywhereinputSchema as unknown as z.ZodType<Prisma.WikidataCacheEntryWhereInput>;
export const WikidataCacheEntryWhereInputObjectZodSchema = wikidatacacheentrywhereinputSchema;
