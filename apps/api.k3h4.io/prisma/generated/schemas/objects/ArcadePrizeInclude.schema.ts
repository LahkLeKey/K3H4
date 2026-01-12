import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeRedemptionFindManySchema as ArcadeRedemptionFindManySchema } from '../findManyArcadeRedemption.schema';
import { ArcadePrizeCountOutputTypeArgsObjectSchema as ArcadePrizeCountOutputTypeArgsObjectSchema } from './ArcadePrizeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  redemptions: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadePrizeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadePrizeIncludeObjectSchema: z.ZodType<Prisma.ArcadePrizeInclude> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeInclude>;
export const ArcadePrizeIncludeObjectZodSchema = makeSchema();
