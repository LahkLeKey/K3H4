import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './MaptilerQuerySelect.schema';
import { MaptilerQueryIncludeObjectSchema as MaptilerQueryIncludeObjectSchema } from './MaptilerQueryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MaptilerQuerySelectObjectSchema).optional(),
  include: z.lazy(() => MaptilerQueryIncludeObjectSchema).optional()
}).strict();
export const MaptilerQueryArgsObjectSchema = makeSchema();
export const MaptilerQueryArgsObjectZodSchema = makeSchema();
