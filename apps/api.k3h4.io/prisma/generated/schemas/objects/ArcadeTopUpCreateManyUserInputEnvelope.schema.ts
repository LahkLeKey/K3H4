import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpCreateManyUserInputObjectSchema as ArcadeTopUpCreateManyUserInputObjectSchema } from './ArcadeTopUpCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeTopUpCreateManyUserInputObjectSchema), z.lazy(() => ArcadeTopUpCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeTopUpCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeTopUpCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpCreateManyUserInputEnvelope>;
export const ArcadeTopUpCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
