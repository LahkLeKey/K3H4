import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateManyQueryInputObjectSchema as MaptilerCacheEntryCreateManyQueryInputObjectSchema } from './MaptilerCacheEntryCreateManyQueryInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MaptilerCacheEntryCreateManyQueryInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateManyQueryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateManyQueryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateManyQueryInputEnvelope>;
export const MaptilerCacheEntryCreateManyQueryInputEnvelopeObjectZodSchema = makeSchema();
