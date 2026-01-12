import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionCreateManyUserInputObjectSchema as ArcadeSessionCreateManyUserInputObjectSchema } from './ArcadeSessionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ArcadeSessionCreateManyUserInputObjectSchema), z.lazy(() => ArcadeSessionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ArcadeSessionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateManyUserInputEnvelope>;
export const ArcadeSessionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
