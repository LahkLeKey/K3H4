import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventorySelectObjectSchema as AgricultureInventorySelectObjectSchema } from './AgricultureInventorySelect.schema';
import { AgricultureInventoryIncludeObjectSchema as AgricultureInventoryIncludeObjectSchema } from './AgricultureInventoryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureInventorySelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureInventoryIncludeObjectSchema).optional()
}).strict();
export const AgricultureInventoryArgsObjectSchema = makeSchema();
export const AgricultureInventoryArgsObjectZodSchema = makeSchema();
