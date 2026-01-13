import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCountOutputTypeSelectObjectSchema as AgricultureInventoryCountOutputTypeSelectObjectSchema } from './AgricultureInventoryCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureInventoryCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AgricultureInventoryCountOutputTypeArgsObjectSchema = makeSchema();
export const AgricultureInventoryCountOutputTypeArgsObjectZodSchema = makeSchema();
