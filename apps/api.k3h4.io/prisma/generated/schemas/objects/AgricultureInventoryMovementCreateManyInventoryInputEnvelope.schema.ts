import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateManyInventoryInputObjectSchema as AgricultureInventoryMovementCreateManyInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateManyInventoryInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureInventoryMovementCreateManyInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateManyInventoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateManyInventoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateManyInventoryInputEnvelope>;
export const AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectZodSchema = makeSchema();
