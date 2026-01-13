import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeCreateManyUserInputObjectSchema as ArcadePrizeCreateManyUserInputObjectSchema } from './ArcadePrizeCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadePrizeCreateManyUserInputObjectSchema), z.lazy(() => ArcadePrizeCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadePrizeCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadePrizeCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCreateManyUserInputEnvelope>;
export const ArcadePrizeCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
