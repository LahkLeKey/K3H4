import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCountOutputTypeSelectObjectSchema as MaptilerQueryCountOutputTypeSelectObjectSchema } from './MaptilerQueryCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MaptilerQueryCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const MaptilerQueryCountOutputTypeArgsObjectSchema = makeSchema();
export const MaptilerQueryCountOutputTypeArgsObjectZodSchema = makeSchema();
