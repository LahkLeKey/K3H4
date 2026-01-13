import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const agricultureresourcescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema), z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema), z.lazy(() => AgricultureResourceScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  categoryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  summary: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureResourceScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureResourceScalarWhereInput> = agricultureresourcescalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureResourceScalarWhereInput>;
export const AgricultureResourceScalarWhereInputObjectZodSchema = agricultureresourcescalarwhereinputSchema;
