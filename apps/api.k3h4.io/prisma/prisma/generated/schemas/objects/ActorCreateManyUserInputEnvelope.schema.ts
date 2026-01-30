import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCreateManyUserInputObjectSchema as ActorCreateManyUserInputObjectSchema } from './ActorCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ActorCreateManyUserInputObjectSchema), z.lazy(() => ActorCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ActorCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ActorCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateManyUserInputEnvelope>;
export const ActorCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
