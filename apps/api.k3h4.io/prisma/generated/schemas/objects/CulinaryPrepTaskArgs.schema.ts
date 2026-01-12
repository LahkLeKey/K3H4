import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskIncludeObjectSchema as CulinaryPrepTaskIncludeObjectSchema } from './CulinaryPrepTaskInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CulinaryPrepTaskSelectObjectSchema).optional(),
  include: z.lazy(() => CulinaryPrepTaskIncludeObjectSchema).optional()
}).strict();
export const CulinaryPrepTaskArgsObjectSchema = makeSchema();
export const CulinaryPrepTaskArgsObjectZodSchema = makeSchema();
