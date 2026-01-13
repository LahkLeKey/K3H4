import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeMachineArgsObjectSchema as ArcadeMachineArgsObjectSchema } from './ArcadeMachineArgs.schema';
import { ArcadeCardArgsObjectSchema as ArcadeCardArgsObjectSchema } from './ArcadeCardArgs.schema';
import { ArcadeRedemptionArgsObjectSchema as ArcadeRedemptionArgsObjectSchema } from './ArcadeRedemptionArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  machineId: z.boolean().optional(),
  machine: z.union([z.boolean(), z.lazy(() => ArcadeMachineArgsObjectSchema)]).optional(),
  cardId: z.boolean().optional(),
  card: z.union([z.boolean(), z.lazy(() => ArcadeCardArgsObjectSchema)]).optional(),
  creditsSpent: z.boolean().optional(),
  score: z.boolean().optional(),
  rewardRedemptionId: z.boolean().optional(),
  rewardRedemption: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionArgsObjectSchema)]).optional(),
  startedAt: z.boolean().optional(),
  endedAt: z.boolean().optional()
}).strict();
export const ArcadeSessionSelectObjectSchema: z.ZodType<Prisma.ArcadeSessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionSelect>;
export const ArcadeSessionSelectObjectZodSchema = makeSchema();
