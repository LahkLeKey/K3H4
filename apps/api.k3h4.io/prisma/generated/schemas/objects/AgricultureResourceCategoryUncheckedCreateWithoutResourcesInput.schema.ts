import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryUncheckedCreateWithoutResourcesInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUncheckedCreateWithoutResourcesInput>;
export const AgricultureResourceCategoryUncheckedCreateWithoutResourcesInputObjectZodSchema = makeSchema();
