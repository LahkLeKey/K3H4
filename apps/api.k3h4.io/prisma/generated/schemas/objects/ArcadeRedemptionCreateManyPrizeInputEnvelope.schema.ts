import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateManyPrizeInputObjectSchema as ArcadeRedemptionCreateManyPrizeInputObjectSchema } from './ArcadeRedemptionCreateManyPrizeInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeRedemptionCreateManyPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateManyPrizeInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyPrizeInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyPrizeInputEnvelope>;
export const ArcadeRedemptionCreateManyPrizeInputEnvelopeObjectZodSchema = makeSchema();
