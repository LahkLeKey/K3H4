import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInputObjectSchema as AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  resources: z.lazy(() => AgricultureResourceUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUncheckedCreateInput>;
export const AgricultureResourceCategoryUncheckedCreateInputObjectZodSchema = makeSchema();
