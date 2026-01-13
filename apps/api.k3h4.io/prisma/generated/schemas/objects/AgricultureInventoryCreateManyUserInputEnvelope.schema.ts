import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCreateManyUserInputObjectSchema as AgricultureInventoryCreateManyUserInputObjectSchema } from './AgricultureInventoryCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureInventoryCreateManyUserInputObjectSchema), z.lazy(() => AgricultureInventoryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureInventoryCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateManyUserInputEnvelope>;
export const AgricultureInventoryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
