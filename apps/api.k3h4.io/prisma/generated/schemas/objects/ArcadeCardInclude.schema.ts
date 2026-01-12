import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeTopUpFindManySchema as ArcadeTopUpFindManySchema } from '../findManyArcadeTopUp.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeRedemptionFindManySchema as ArcadeRedemptionFindManySchema } from '../findManyArcadeRedemption.schema';
import { ArcadeCardCountOutputTypeArgsObjectSchema as ArcadeCardCountOutputTypeArgsObjectSchema } from './ArcadeCardCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  topUps: z.union([z.boolean(), z.lazy(() => ArcadeTopUpFindManySchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  redemptions: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadeCardCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadeCardIncludeObjectSchema: z.ZodType<Prisma.ArcadeCardInclude> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardInclude>;
export const ArcadeCardIncludeObjectZodSchema = makeSchema();
