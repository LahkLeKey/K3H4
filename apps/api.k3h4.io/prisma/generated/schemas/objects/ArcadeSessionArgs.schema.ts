import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionSelectObjectSchema as ArcadeSessionSelectObjectSchema } from './ArcadeSessionSelect.schema';
import { ArcadeSessionIncludeObjectSchema as ArcadeSessionIncludeObjectSchema } from './ArcadeSessionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeSessionSelectObjectSchema).optional(),
  include: z.lazy(() => ArcadeSessionIncludeObjectSchema).optional()
}).strict();
export const ArcadeSessionArgsObjectSchema = makeSchema();
export const ArcadeSessionArgsObjectZodSchema = makeSchema();
