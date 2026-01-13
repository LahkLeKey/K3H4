import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const agricultureresourcescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureResourceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureResourceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureResourceScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureResourceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureResourceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  categoryId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  summary: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  tags: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  source: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureResourceScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceScalarWhereWithAggregatesInput> = agricultureresourcescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AgricultureResourceScalarWhereWithAggregatesInput>;
export const AgricultureResourceScalarWhereWithAggregatesInputObjectZodSchema = agricultureresourcescalarwherewithaggregatesinputSchema;
