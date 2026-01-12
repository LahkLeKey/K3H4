import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCountOutputTypeCountSessionsArgsObjectSchema as ArcadeRedemptionCountOutputTypeCountSessionsArgsObjectSchema } from './ArcadeRedemptionCountOutputTypeCountSessionsArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => ArcadeRedemptionCountOutputTypeCountSessionsArgsObjectSchema)]).optional()
}).strict();
export const ArcadeRedemptionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCountOutputTypeSelect>;
export const ArcadeRedemptionCountOutputTypeSelectObjectZodSchema = makeSchema();
