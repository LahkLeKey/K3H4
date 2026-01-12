import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { AgricultureResourceListRelationFilterObjectSchema as AgricultureResourceListRelationFilterObjectSchema } from './AgricultureResourceListRelationFilter.schema'

const agricultureresourcecategorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema), z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema), z.lazy(() => AgricultureResourceCategoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  resources: z.lazy(() => AgricultureResourceListRelationFilterObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryWhereInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryWhereInput> = agricultureresourcecategorywhereinputSchema as unknown as z.ZodType<Prisma.AgricultureResourceCategoryWhereInput>;
export const AgricultureResourceCategoryWhereInputObjectZodSchema = agricultureresourcecategorywhereinputSchema;
