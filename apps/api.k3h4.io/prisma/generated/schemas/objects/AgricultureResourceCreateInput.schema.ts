import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreatetagsInputObjectSchema as AgricultureResourceCreatetagsInputObjectSchema } from './AgricultureResourceCreatetagsInput.schema';
import { AgricultureResourceCategoryCreateNestedOneWithoutResourcesInputObjectSchema as AgricultureResourceCategoryCreateNestedOneWithoutResourcesInputObjectSchema } from './AgricultureResourceCategoryCreateNestedOneWithoutResourcesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  tags: z.union([z.lazy(() => AgricultureResourceCreatetagsInputObjectSchema), z.string().array()]).optional(),
  source: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  category: z.lazy(() => AgricultureResourceCategoryCreateNestedOneWithoutResourcesInputObjectSchema)
}).strict();
export const AgricultureResourceCreateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCreateInput>;
export const AgricultureResourceCreateInputObjectZodSchema = makeSchema();
