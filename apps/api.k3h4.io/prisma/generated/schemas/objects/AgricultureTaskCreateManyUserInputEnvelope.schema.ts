import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateManyUserInputObjectSchema as AgricultureTaskCreateManyUserInputObjectSchema } from './AgricultureTaskCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureTaskCreateManyUserInputObjectSchema), z.lazy(() => AgricultureTaskCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureTaskCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateManyUserInputEnvelope>;
export const AgricultureTaskCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
