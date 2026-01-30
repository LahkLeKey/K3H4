import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const entitycachescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EntityCacheScalarWhereInputObjectSchema), z.lazy(() => EntityCacheScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EntityCacheScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EntityCacheScalarWhereInputObjectSchema), z.lazy(() => EntityCacheScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  entityId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EntityCacheScalarWhereInputObjectSchema: z.ZodType<Prisma.EntityCacheScalarWhereInput> = entitycachescalarwhereinputSchema as unknown as z.ZodType<Prisma.EntityCacheScalarWhereInput>;
export const EntityCacheScalarWhereInputObjectZodSchema = entitycachescalarwhereinputSchema;
