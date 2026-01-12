import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreateNestedManyWithoutCategoryInputObjectSchema as AgricultureResourceCreateNestedManyWithoutCategoryInputObjectSchema } from './AgricultureResourceCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  resources: z.lazy(() => AgricultureResourceCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryCreateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateInput>;
export const AgricultureResourceCategoryCreateInputObjectZodSchema = makeSchema();
