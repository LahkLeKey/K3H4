import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const entityscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EntityScalarWhereInputObjectSchema), z.lazy(() => EntityScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EntityScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EntityScalarWhereInputObjectSchema), z.lazy(() => EntityScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  kind: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  direction: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EntityScalarWhereInputObjectSchema: z.ZodType<Prisma.EntityScalarWhereInput> = entityscalarwhereinputSchema as unknown as z.ZodType<Prisma.EntityScalarWhereInput>;
export const EntityScalarWhereInputObjectZodSchema = entityscalarwhereinputSchema;
