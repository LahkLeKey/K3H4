import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const entitycachescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => EntityCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EntityCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EntityCacheScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EntityCacheScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EntityCacheScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  entityId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  key: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EntityCacheScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EntityCacheScalarWhereWithAggregatesInput> = entitycachescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.EntityCacheScalarWhereWithAggregatesInput>;
export const EntityCacheScalarWhereWithAggregatesInputObjectZodSchema = entitycachescalarwherewithaggregatesinputSchema;
