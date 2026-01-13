import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateManyFreightLoadInputObjectSchema as AgricultureShipmentCreateManyFreightLoadInputObjectSchema } from './AgricultureShipmentCreateManyFreightLoadInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureShipmentCreateManyFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentCreateManyFreightLoadInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateManyFreightLoadInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateManyFreightLoadInputEnvelope>;
export const AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectZodSchema = makeSchema();
