import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotCreateManyUserInputObjectSchema as AgricultureSlotCreateManyUserInputObjectSchema } from './AgricultureSlotCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureSlotCreateManyUserInputObjectSchema), z.lazy(() => AgricultureSlotCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureSlotCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateManyUserInputEnvelope>;
export const AgricultureSlotCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
