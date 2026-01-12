import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreatetagsInputObjectSchema as AgricultureResourceCreatetagsInputObjectSchema } from './AgricultureResourceCreatetagsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  tags: z.union([z.lazy(() => AgricultureResourceCreatetagsInputObjectSchema), z.string().array()]).optional(),
  source: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureResourceUncheckedCreateWithoutCategoryInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUncheckedCreateWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUncheckedCreateWithoutCategoryInput>;
export const AgricultureResourceUncheckedCreateWithoutCategoryInputObjectZodSchema = makeSchema();
