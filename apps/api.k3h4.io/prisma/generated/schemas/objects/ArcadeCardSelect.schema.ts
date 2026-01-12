import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeTopUpFindManySchema as ArcadeTopUpFindManySchema } from '../findManyArcadeTopUp.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeRedemptionFindManySchema as ArcadeRedemptionFindManySchema } from '../findManyArcadeRedemption.schema';
import { ArcadeCardCountOutputTypeArgsObjectSchema as ArcadeCardCountOutputTypeArgsObjectSchema } from './ArcadeCardCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  label: z.boolean().optional(),
  balance: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  topUps: z.union([z.boolean(), z.lazy(() => ArcadeTopUpFindManySchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  redemptions: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadeCardCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadeCardSelectObjectSchema: z.ZodType<Prisma.ArcadeCardSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardSelect>;
export const ArcadeCardSelectObjectZodSchema = makeSchema();
