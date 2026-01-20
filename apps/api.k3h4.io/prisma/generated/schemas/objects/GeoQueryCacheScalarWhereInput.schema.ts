import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const geoquerycachescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema), z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema), z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonFilterObjectSchema).optional(),
  count: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoQueryCacheScalarWhereInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheScalarWhereInput> = geoquerycachescalarwhereinputSchema as unknown as z.ZodType<Prisma.GeoQueryCacheScalarWhereInput>;
export const GeoQueryCacheScalarWhereInputObjectZodSchema = geoquerycachescalarwhereinputSchema;
