import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeRedemptionFindManySchema as ArcadeRedemptionFindManySchema } from '../findManyArcadeRedemption.schema';
import { ArcadePrizeCountOutputTypeArgsObjectSchema as ArcadePrizeCountOutputTypeArgsObjectSchema } from './ArcadePrizeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  name: z.boolean().optional(),
  sku: z.boolean().optional(),
  costCoins: z.boolean().optional(),
  stock: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  redemptions: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadePrizeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadePrizeSelectObjectSchema: z.ZodType<Prisma.ArcadePrizeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeSelect>;
export const ArcadePrizeSelectObjectZodSchema = makeSchema();
