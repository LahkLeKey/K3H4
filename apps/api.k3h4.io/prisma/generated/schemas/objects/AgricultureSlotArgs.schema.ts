import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './AgricultureSlotSelect.schema';
import { AgricultureSlotIncludeObjectSchema as AgricultureSlotIncludeObjectSchema } from './AgricultureSlotInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureSlotSelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureSlotIncludeObjectSchema).optional()
}).strict();
export const AgricultureSlotArgsObjectSchema = makeSchema();
export const AgricultureSlotArgsObjectZodSchema = makeSchema();
