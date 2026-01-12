import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ArcadeCardArgsObjectSchema as ArcadeCardArgsObjectSchema } from './ArcadeCardArgs.schema';
import { ArcadePrizeArgsObjectSchema as ArcadePrizeArgsObjectSchema } from './ArcadePrizeArgs.schema';
import { ArcadeSessionFindManySchema as ArcadeSessionFindManySchema } from '../findManyArcadeSession.schema';
import { ArcadeRedemptionCountOutputTypeArgsObjectSchema as ArcadeRedemptionCountOutputTypeArgsObjectSchema } from './ArcadeRedemptionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  card: z.union([z.boolean(), z.lazy(() => ArcadeCardArgsObjectSchema)]).optional(),
  prize: z.union([z.boolean(), z.lazy(() => ArcadePrizeArgsObjectSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeSessionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ArcadeRedemptionIncludeObjectSchema: z.ZodType<Prisma.ArcadeRedemptionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionInclude>;
export const ArcadeRedemptionIncludeObjectZodSchema = makeSchema();
