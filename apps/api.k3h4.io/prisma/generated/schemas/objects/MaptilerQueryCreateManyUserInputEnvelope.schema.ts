import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateManyUserInputObjectSchema as MaptilerQueryCreateManyUserInputObjectSchema } from './MaptilerQueryCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MaptilerQueryCreateManyUserInputObjectSchema), z.lazy(() => MaptilerQueryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MaptilerQueryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateManyUserInputEnvelope>;
export const MaptilerQueryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
