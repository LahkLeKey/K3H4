import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCreateManyUserInputObjectSchema as PosStoreCreateManyUserInputObjectSchema } from './PosStoreCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PosStoreCreateManyUserInputObjectSchema), z.lazy(() => PosStoreCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PosStoreCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PosStoreCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCreateManyUserInputEnvelope>;
export const PosStoreCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
