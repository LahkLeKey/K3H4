import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateManyShipmentInputObjectSchema as AgricultureInventoryMovementCreateManyShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateManyShipmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureInventoryMovementCreateManyShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateManyShipmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateManyShipmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateManyShipmentInputEnvelope>;
export const AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectZodSchema = makeSchema();
