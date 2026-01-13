import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionSelectObjectSchema as ArcadeRedemptionSelectObjectSchema } from './ArcadeRedemptionSelect.schema';
import { ArcadeRedemptionIncludeObjectSchema as ArcadeRedemptionIncludeObjectSchema } from './ArcadeRedemptionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ArcadeRedemptionSelectObjectSchema).optional(),
  include: z.lazy(() => ArcadeRedemptionIncludeObjectSchema).optional()
}).strict();
export const ArcadeRedemptionArgsObjectSchema = makeSchema();
export const ArcadeRedemptionArgsObjectZodSchema = makeSchema();
