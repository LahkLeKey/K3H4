import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeSelectObjectSchema as ArcadePrizeSelectObjectSchema } from './ArcadePrizeSelect.schema';
import { ArcadePrizeIncludeObjectSchema as ArcadePrizeIncludeObjectSchema } from './ArcadePrizeInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadePrizeSelectObjectSchema).optional(),
  include: z.lazy(() => ArcadePrizeIncludeObjectSchema).optional()
}).strict();
export const ArcadePrizeArgsObjectSchema = makeSchema();
export const ArcadePrizeArgsObjectZodSchema = makeSchema();
