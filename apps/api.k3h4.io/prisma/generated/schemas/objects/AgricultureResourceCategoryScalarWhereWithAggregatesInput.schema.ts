import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const agricultureresourcecategoryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryScalarWhereWithAggregatesInput> = agricultureresourcecategoryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AgricultureResourceCategoryScalarWhereWithAggregatesInput>;
export const AgricultureResourceCategoryScalarWhereWithAggregatesInputObjectZodSchema = agricultureresourcecategoryscalarwherewithaggregatesinputSchema;
