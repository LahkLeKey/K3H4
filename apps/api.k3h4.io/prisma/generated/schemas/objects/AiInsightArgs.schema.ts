import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './AiInsightSelect.schema';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './AiInsightInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AiInsightSelectObjectSchema).optional(),
  include: z.lazy(() => AiInsightIncludeObjectSchema).optional()
}).strict();
export const AiInsightArgsObjectSchema = makeSchema();
export const AiInsightArgsObjectZodSchema = makeSchema();
