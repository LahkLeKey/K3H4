import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotCreateManyPlotInputObjectSchema as AgricultureSlotCreateManyPlotInputObjectSchema } from './AgricultureSlotCreateManyPlotInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureSlotCreateManyPlotInputObjectSchema), z.lazy(() => AgricultureSlotCreateManyPlotInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureSlotCreateManyPlotInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateManyPlotInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateManyPlotInputEnvelope>;
export const AgricultureSlotCreateManyPlotInputEnvelopeObjectZodSchema = makeSchema();
