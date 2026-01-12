import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCountOutputTypeCountTopUpsArgsObjectSchema as ArcadeCardCountOutputTypeCountTopUpsArgsObjectSchema } from './ArcadeCardCountOutputTypeCountTopUpsArgs.schema';
import { ArcadeCardCountOutputTypeCountSessionsArgsObjectSchema as ArcadeCardCountOutputTypeCountSessionsArgsObjectSchema } from './ArcadeCardCountOutputTypeCountSessionsArgs.schema';
import { ArcadeCardCountOutputTypeCountRedemptionsArgsObjectSchema as ArcadeCardCountOutputTypeCountRedemptionsArgsObjectSchema } from './ArcadeCardCountOutputTypeCountRedemptionsArgs.schema'

const makeSchema = () => z.object({
  topUps: z.union([z.boolean(), z.lazy(() => ArcadeCardCountOutputTypeCountTopUpsArgsObjectSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeCardCountOutputTypeCountSessionsArgsObjectSchema)]).optional(),
  redemptions: z.union([z.boolean(), z.lazy(() => ArcadeCardCountOutputTypeCountRedemptionsArgsObjectSchema)]).optional()
}).strict();
export const ArcadeCardCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ArcadeCardCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCountOutputTypeSelect>;
export const ArcadeCardCountOutputTypeSelectObjectZodSchema = makeSchema();
