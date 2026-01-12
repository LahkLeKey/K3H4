import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateManyUserInputObjectSchema as AgricultureInventoryMovementCreateManyUserInputObjectSchema } from './AgricultureInventoryMovementCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureInventoryMovementCreateManyUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateManyUserInputEnvelope>;
export const AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
