import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpSelectObjectSchema as ArcadeTopUpSelectObjectSchema } from './ArcadeTopUpSelect.schema';
import { ArcadeTopUpIncludeObjectSchema as ArcadeTopUpIncludeObjectSchema } from './ArcadeTopUpInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeTopUpSelectObjectSchema).optional(),
  include: z.lazy(() => ArcadeTopUpIncludeObjectSchema).optional()
}).strict();
export const ArcadeTopUpArgsObjectSchema = makeSchema();
export const ArcadeTopUpArgsObjectZodSchema = makeSchema();
