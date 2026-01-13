import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeMachineArgsObjectSchema as ArcadeMachineArgsObjectSchema } from './ArcadeMachineArgs.schema';
import { ArcadeCardArgsObjectSchema as ArcadeCardArgsObjectSchema } from './ArcadeCardArgs.schema';
import { ArcadeRedemptionArgsObjectSchema as ArcadeRedemptionArgsObjectSchema } from './ArcadeRedemptionArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  machine: z.union([z.boolean(), z.lazy(() => ArcadeMachineArgsObjectSchema)]).optional(),
  card: z.union([z.boolean(), z.lazy(() => ArcadeCardArgsObjectSchema)]).optional(),
  rewardRedemption: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionArgsObjectSchema)]).optional()
}).strict();
export const ArcadeSessionIncludeObjectSchema: z.ZodType<Prisma.ArcadeSessionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionInclude>;
export const ArcadeSessionIncludeObjectZodSchema = makeSchema();
