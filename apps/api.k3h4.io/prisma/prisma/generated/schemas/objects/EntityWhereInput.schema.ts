import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumEntityKindFilterObjectSchema as EnumEntityKindFilterObjectSchema } from './EnumEntityKindFilter.schema';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { EnumEntityDirectionNullableFilterObjectSchema as EnumEntityDirectionNullableFilterObjectSchema } from './EnumEntityDirectionNullableFilter.schema';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ActorScalarRelationFilterObjectSchema as ActorScalarRelationFilterObjectSchema } from './ActorScalarRelationFilter.schema';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './ActorWhereInput.schema';
import { EntityCacheListRelationFilterObjectSchema as EntityCacheListRelationFilterObjectSchema } from './EntityCacheListRelationFilter.schema'

const entitywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EntityWhereInputObjectSchema), z.lazy(() => EntityWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EntityWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EntityWhereInputObjectSchema), z.lazy(() => EntityWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => EnumEntityKindFilterObjectSchema), EntityKindSchema]).optional(),
  direction: z.union([z.lazy(() => EnumEntityDirectionNullableFilterObjectSchema), EntityDirectionSchema]).optional().nullable(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  actor: z.union([z.lazy(() => ActorScalarRelationFilterObjectSchema), z.lazy(() => ActorWhereInputObjectSchema)]).optional(),
  caches: z.lazy(() => EntityCacheListRelationFilterObjectSchema).optional()
}).strict();
export const EntityWhereInputObjectSchema: z.ZodType<Prisma.EntityWhereInput> = entitywhereinputSchema as unknown as z.ZodType<Prisma.EntityWhereInput>;
export const EntityWhereInputObjectZodSchema = entitywhereinputSchema;
