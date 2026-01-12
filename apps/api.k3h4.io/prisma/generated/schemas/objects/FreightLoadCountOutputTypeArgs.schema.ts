import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCountOutputTypeSelectObjectSchema as FreightLoadCountOutputTypeSelectObjectSchema } from './FreightLoadCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FreightLoadCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const FreightLoadCountOutputTypeArgsObjectSchema = makeSchema();
export const FreightLoadCountOutputTypeArgsObjectZodSchema = makeSchema();
