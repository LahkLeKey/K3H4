import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskCreateManyUserInputObjectSchema as CulinaryPrepTaskCreateManyUserInputObjectSchema } from './CulinaryPrepTaskCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CulinaryPrepTaskCreateManyUserInputObjectSchema), z.lazy(() => CulinaryPrepTaskCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CulinaryPrepTaskCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateManyUserInputEnvelope>;
export const CulinaryPrepTaskCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
