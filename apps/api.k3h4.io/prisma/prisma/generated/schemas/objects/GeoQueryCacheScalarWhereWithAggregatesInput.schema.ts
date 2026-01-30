import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const geoquerycachescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoQueryCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => GeoQueryCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoQueryCacheScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoQueryCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => GeoQueryCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  params: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  count: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoQueryCacheScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheScalarWhereWithAggregatesInput> = geoquerycachescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.GeoQueryCacheScalarWhereWithAggregatesInput>;
export const GeoQueryCacheScalarWhereWithAggregatesInputObjectZodSchema = geoquerycachescalarwherewithaggregatesinputSchema;
