import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardSelectObjectSchema as ArcadeCardSelectObjectSchema } from './ArcadeCardSelect.schema';
import { ArcadeCardIncludeObjectSchema as ArcadeCardIncludeObjectSchema } from './ArcadeCardInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeCardSelectObjectSchema).optional(),
  include: z.lazy(() => ArcadeCardIncludeObjectSchema).optional()
}).strict();
export const ArcadeCardArgsObjectSchema = makeSchema();
export const ArcadeCardArgsObjectZodSchema = makeSchema();
