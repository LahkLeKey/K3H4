import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const usdacacheentrywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UsdaCacheEntryWhereInputObjectSchema), z.lazy(() => UsdaCacheEntryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UsdaCacheEntryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UsdaCacheEntryWhereInputObjectSchema), z.lazy(() => UsdaCacheEntryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dataset: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  endpoint: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const UsdaCacheEntryWhereInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryWhereInput> = usdacacheentrywhereinputSchema as unknown as z.ZodType<Prisma.UsdaCacheEntryWhereInput>;
export const UsdaCacheEntryWhereInputObjectZodSchema = usdacacheentrywhereinputSchema;
