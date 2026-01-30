import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const apicacheentrywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ApiCacheEntryWhereInputObjectSchema), z.lazy(() => ApiCacheEntryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ApiCacheEntryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ApiCacheEntryWhereInputObjectSchema), z.lazy(() => ApiCacheEntryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  scope: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  endpoint: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ApiCacheEntryWhereInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryWhereInput> = apicacheentrywhereinputSchema as unknown as z.ZodType<Prisma.ApiCacheEntryWhereInput>;
export const ApiCacheEntryWhereInputObjectZodSchema = apicacheentrywhereinputSchema;
