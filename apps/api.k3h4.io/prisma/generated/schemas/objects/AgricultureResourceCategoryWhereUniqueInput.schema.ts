import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  slug: z.string().optional()
}).strict();
export const AgricultureResourceCategoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryWhereUniqueInput>;
export const AgricultureResourceCategoryWhereUniqueInputObjectZodSchema = makeSchema();
