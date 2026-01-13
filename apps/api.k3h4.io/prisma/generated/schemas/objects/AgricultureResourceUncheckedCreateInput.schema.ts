import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreatetagsInputObjectSchema as AgricultureResourceCreatetagsInputObjectSchema } from './AgricultureResourceCreatetagsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  categoryId: z.string(),
  title: z.string(),
  summary: z.string(),
  url: z.string(),
  tags: z.union([z.lazy(() => AgricultureResourceCreatetagsInputObjectSchema), z.string().array()]).optional(),
  source: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const AgricultureResourceUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUncheckedCreateInput>;
export const AgricultureResourceUncheckedCreateInputObjectZodSchema = makeSchema();
