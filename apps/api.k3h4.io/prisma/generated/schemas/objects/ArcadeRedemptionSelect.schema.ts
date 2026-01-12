import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeCardArgsObjectSchema as ArcadeCardArgsObjectSchema } from './ArcadeCardArgs.schema';
import { ArcadePrizeArgsObjectSchema as ArcadePrizeArgsObjectSchema } from './ArcadePrizeArgs.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeRedemptionCountOutputTypeArgsObjectSchema as ArcadeRedemptionCountOutputTypeArgsObjectSchema } from './ArcadeRedemptionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  cardId: z.boolean().optional(),
  card: z.union([z.boolean(), z.lazy(() => ArcadeCardArgsObjectSchema)]).optional(),
  prizeId: z.boolean().optional(),
  prize: z.union([z.boolean(), z.lazy(() => ArcadePrizeArgsObjectSchema)]).optional(),
  status: z.boolean().optional(),
  fulfilledAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadeRedemptionSelectObjectSchema: z.ZodType<Prisma.ArcadeRedemptionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionSelect>;
export const ArcadeRedemptionSelectObjectZodSchema = makeSchema();
