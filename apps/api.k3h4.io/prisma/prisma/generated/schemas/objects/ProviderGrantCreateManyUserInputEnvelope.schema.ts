import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantCreateManyUserInputObjectSchema as ProviderGrantCreateManyUserInputObjectSchema } from './ProviderGrantCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProviderGrantCreateManyUserInputObjectSchema), z.lazy(() => ProviderGrantCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProviderGrantCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ProviderGrantCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantCreateManyUserInputEnvelope>;
export const ProviderGrantCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
