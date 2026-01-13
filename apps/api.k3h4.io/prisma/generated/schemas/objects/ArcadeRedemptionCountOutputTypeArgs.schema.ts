import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCountOutputTypeSelectObjectSchema as ArcadeRedemptionCountOutputTypeSelectObjectSchema } from './ArcadeRedemptionCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeRedemptionCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ArcadeRedemptionCountOutputTypeArgsObjectSchema = makeSchema();
export const ArcadeRedemptionCountOutputTypeArgsObjectZodSchema = makeSchema();
