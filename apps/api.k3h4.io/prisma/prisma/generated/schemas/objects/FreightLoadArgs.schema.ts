import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './FreightLoadSelect.schema';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './FreightLoadInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FreightLoadSelectObjectSchema).optional(),
  include: z.lazy(() => FreightLoadIncludeObjectSchema).optional()
}).strict();
export const FreightLoadArgsObjectSchema = makeSchema();
export const FreightLoadArgsObjectZodSchema = makeSchema();
