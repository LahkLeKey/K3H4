import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateManyUserInputObjectSchema as ArcadeCardCreateManyUserInputObjectSchema } from './ArcadeCardCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeCardCreateManyUserInputObjectSchema), z.lazy(() => ArcadeCardCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeCardCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeCardCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateManyUserInputEnvelope>;
export const ArcadeCardCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
