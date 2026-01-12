import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCountOutputTypeSelectObjectSchema as ArcadePrizeCountOutputTypeSelectObjectSchema } from './ArcadePrizeCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadePrizeCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ArcadePrizeCountOutputTypeArgsObjectSchema = makeSchema();
export const ArcadePrizeCountOutputTypeArgsObjectZodSchema = makeSchema();
