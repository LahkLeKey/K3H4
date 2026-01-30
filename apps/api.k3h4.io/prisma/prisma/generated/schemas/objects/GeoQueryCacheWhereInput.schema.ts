import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const geoquerycachewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoQueryCacheWhereInputObjectSchema), z.lazy(() => GeoQueryCacheWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoQueryCacheWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoQueryCacheWhereInputObjectSchema), z.lazy(() => GeoQueryCacheWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonFilterObjectSchema).optional(),
  count: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const GeoQueryCacheWhereInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheWhereInput> = geoquerycachewhereinputSchema as unknown as z.ZodType<Prisma.GeoQueryCacheWhereInput>;
export const GeoQueryCacheWhereInputObjectZodSchema = geoquerycachewhereinputSchema;
