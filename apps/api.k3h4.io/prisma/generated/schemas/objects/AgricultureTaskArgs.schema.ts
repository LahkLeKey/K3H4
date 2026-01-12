import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskSelectObjectSchema as AgricultureTaskSelectObjectSchema } from './AgricultureTaskSelect.schema';
import { AgricultureTaskIncludeObjectSchema as AgricultureTaskIncludeObjectSchema } from './AgricultureTaskInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureTaskSelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureTaskIncludeObjectSchema).optional()
}).strict();
export const AgricultureTaskArgsObjectSchema = makeSchema();
export const AgricultureTaskArgsObjectZodSchema = makeSchema();
