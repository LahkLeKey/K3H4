import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceCreateManyCategoryInputObjectSchema as AgricultureResourceCreateManyCategoryInputObjectSchema } from './AgricultureResourceCreateManyCategoryInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AgricultureResourceCreateManyCategoryInputObjectSchema), z.lazy(() => AgricultureResourceCreateManyCategoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AgricultureResourceCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.AgricultureResourceCreateManyCategoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCreateManyCategoryInputEnvelope>;
export const AgricultureResourceCreateManyCategoryInputEnvelopeObjectZodSchema = makeSchema();
