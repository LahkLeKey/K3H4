import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateManyUserInputObjectSchema as FreightLoadCreateManyUserInputObjectSchema } from './FreightLoadCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FreightLoadCreateManyUserInputObjectSchema), z.lazy(() => FreightLoadCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FreightLoadCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.FreightLoadCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateManyUserInputEnvelope>;
export const FreightLoadCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
