import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateManyPlotInputObjectSchema as AgricultureTaskCreateManyPlotInputObjectSchema } from './AgricultureTaskCreateManyPlotInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureTaskCreateManyPlotInputObjectSchema), z.lazy(() => AgricultureTaskCreateManyPlotInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureTaskCreateManyPlotInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateManyPlotInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateManyPlotInputEnvelope>;
export const AgricultureTaskCreateManyPlotInputEnvelopeObjectZodSchema = makeSchema();
