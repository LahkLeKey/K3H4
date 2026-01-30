import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EntityScalarRelationFilterObjectSchema as EntityScalarRelationFilterObjectSchema } from './EntityScalarRelationFilter.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './EntityWhereInput.schema'

const entitycachewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EntityCacheWhereInputObjectSchema), z.lazy(() => EntityCacheWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EntityCacheWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EntityCacheWhereInputObjectSchema), z.lazy(() => EntityCacheWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  entityId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  entity: z.union([z.lazy(() => EntityScalarRelationFilterObjectSchema), z.lazy(() => EntityWhereInputObjectSchema)]).optional()
}).strict();
export const EntityCacheWhereInputObjectSchema: z.ZodType<Prisma.EntityCacheWhereInput> = entitycachewhereinputSchema as unknown as z.ZodType<Prisma.EntityCacheWhereInput>;
export const EntityCacheWhereInputObjectZodSchema = entitycachewhereinputSchema;
