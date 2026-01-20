import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateManyUserInputObjectSchema as MaptilerCacheEntryCreateManyUserInputObjectSchema } from './MaptilerCacheEntryCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MaptilerCacheEntryCreateManyUserInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MaptilerCacheEntryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateManyUserInputEnvelope>;
export const MaptilerCacheEntryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
