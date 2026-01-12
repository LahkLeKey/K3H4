import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeMachineCreateManyUserInputObjectSchema as ArcadeMachineCreateManyUserInputObjectSchema } from './ArcadeMachineCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeMachineCreateManyUserInputObjectSchema), z.lazy(() => ArcadeMachineCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeMachineCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeMachineCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCreateManyUserInputEnvelope>;
export const ArcadeMachineCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
