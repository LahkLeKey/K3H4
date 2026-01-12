import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateManyUserInputObjectSchema as AgricultureShipmentCreateManyUserInputObjectSchema } from './AgricultureShipmentCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureShipmentCreateManyUserInputObjectSchema), z.lazy(() => AgricultureShipmentCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateManyUserInputEnvelope>;
export const AgricultureShipmentCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
