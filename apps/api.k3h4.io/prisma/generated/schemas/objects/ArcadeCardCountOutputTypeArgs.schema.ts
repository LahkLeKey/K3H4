import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCountOutputTypeSelectObjectSchema as ArcadeCardCountOutputTypeSelectObjectSchema } from './ArcadeCardCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeCardCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ArcadeCardCountOutputTypeArgsObjectSchema = makeSchema();
export const ArcadeCardCountOutputTypeArgsObjectZodSchema = makeSchema();
