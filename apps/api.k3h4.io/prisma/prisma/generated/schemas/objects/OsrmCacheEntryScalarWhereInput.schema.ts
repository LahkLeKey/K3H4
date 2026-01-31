import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const osrmcacheentryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema), z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema), z.lazy(() => OsrmCacheEntryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  actorId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  service: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  profile: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  coordinates: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  params: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  paramsHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  statusCode: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  fetchedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const OsrmCacheEntryScalarWhereInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryScalarWhereInput> = osrmcacheentryscalarwhereinputSchema as unknown as z.ZodType<Prisma.OsrmCacheEntryScalarWhereInput>;
export const OsrmCacheEntryScalarWhereInputObjectZodSchema = osrmcacheentryscalarwhereinputSchema;
