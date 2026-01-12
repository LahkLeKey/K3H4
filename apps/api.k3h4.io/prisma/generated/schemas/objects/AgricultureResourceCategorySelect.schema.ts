import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceFindManySchema as AgricultureResourceFindManySchema } from '../findManyAgricultureResource.schema';
import { AgricultureResourceCategoryCountOutputTypeArgsObjectSchema as AgricultureResourceCategoryCountOutputTypeArgsObjectSchema } from './AgricultureResourceCategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  resources: z.union([z.boolean(), z.lazy(() => AgricultureResourceFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureResourceCategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureResourceCategorySelectObjectSchema: z.ZodType<Prisma.AgricultureResourceCategorySelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategorySelect>;
export const AgricultureResourceCategorySelectObjectZodSchema = makeSchema();
