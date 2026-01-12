import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionCreateManyUserInputObjectSchema as ArcadeRedemptionCreateManyUserInputObjectSchema } from './ArcadeRedemptionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeRedemptionCreateManyUserInputObjectSchema), z.lazy(() => ArcadeRedemptionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeRedemptionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyUserInputEnvelope>;
export const ArcadeRedemptionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
