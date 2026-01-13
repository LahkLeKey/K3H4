import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCountOutputTypeCountRedemptionsArgsObjectSchema as ArcadePrizeCountOutputTypeCountRedemptionsArgsObjectSchema } from './ArcadePrizeCountOutputTypeCountRedemptionsArgs.schema'

const makeSchema = () => z.object({
  redemptions: z.union([z.boolean(), z.lazy(() => ArcadePrizeCountOutputTypeCountRedemptionsArgsObjectSchema)]).optional()
}).strict();
export const ArcadePrizeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ArcadePrizeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCountOutputTypeSelect>;
export const ArcadePrizeCountOutputTypeSelectObjectZodSchema = makeSchema();
