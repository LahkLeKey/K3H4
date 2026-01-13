import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemCreateManyFreightLoadInputObjectSchema as WarehouseItemCreateManyFreightLoadInputObjectSchema } from './WarehouseItemCreateManyFreightLoadInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => WarehouseItemCreateManyFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemCreateManyFreightLoadInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema: z.ZodType<Prisma.WarehouseItemCreateManyFreightLoadInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateManyFreightLoadInputEnvelope>;
export const WarehouseItemCreateManyFreightLoadInputEnvelopeObjectZodSchema = makeSchema();
