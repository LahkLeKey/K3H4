import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemCreateManyUserInputObjectSchema as WarehouseItemCreateManyUserInputObjectSchema } from './WarehouseItemCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => WarehouseItemCreateManyUserInputObjectSchema), z.lazy(() => WarehouseItemCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const WarehouseItemCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.WarehouseItemCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateManyUserInputEnvelope>;
export const WarehouseItemCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
