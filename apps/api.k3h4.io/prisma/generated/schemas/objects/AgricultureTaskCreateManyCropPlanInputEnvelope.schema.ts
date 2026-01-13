import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateManyCropPlanInputObjectSchema as AgricultureTaskCreateManyCropPlanInputObjectSchema } from './AgricultureTaskCreateManyCropPlanInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureTaskCreateManyCropPlanInputObjectSchema), z.lazy(() => AgricultureTaskCreateManyCropPlanInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureTaskCreateManyCropPlanInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateManyCropPlanInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateManyCropPlanInputEnvelope>;
export const AgricultureTaskCreateManyCropPlanInputEnvelopeObjectZodSchema = makeSchema();
