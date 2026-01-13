import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceWhereInputObjectSchema as AgricultureResourceWhereInputObjectSchema } from './AgricultureResourceWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureResourceWhereInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryCountOutputTypeCountResourcesArgsObjectSchema = makeSchema();
export const AgricultureResourceCategoryCountOutputTypeCountResourcesArgsObjectZodSchema = makeSchema();
