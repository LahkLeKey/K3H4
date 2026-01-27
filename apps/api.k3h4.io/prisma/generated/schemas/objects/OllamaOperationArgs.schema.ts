import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationSelectObjectSchema as OllamaOperationSelectObjectSchema } from './OllamaOperationSelect.schema';
import { OllamaOperationIncludeObjectSchema as OllamaOperationIncludeObjectSchema } from './OllamaOperationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OllamaOperationSelectObjectSchema).optional(),
  include: z.lazy(() => OllamaOperationIncludeObjectSchema).optional()
}).strict();
export const OllamaOperationArgsObjectSchema = makeSchema();
export const OllamaOperationArgsObjectZodSchema = makeSchema();
