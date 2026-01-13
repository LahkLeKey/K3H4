import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCategoryCountOutputTypeCountResourcesArgsObjectSchema as AgricultureResourceCategoryCountOutputTypeCountResourcesArgsObjectSchema } from './AgricultureResourceCategoryCountOutputTypeCountResourcesArgs.schema'

const makeSchema = () => z.object({
  resources: z.union([z.boolean(), z.lazy(() => AgricultureResourceCategoryCountOutputTypeCountResourcesArgsObjectSchema)]).optional()
}).strict();
export const AgricultureResourceCategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCountOutputTypeSelect>;
export const AgricultureResourceCategoryCountOutputTypeSelectObjectZodSchema = makeSchema();
