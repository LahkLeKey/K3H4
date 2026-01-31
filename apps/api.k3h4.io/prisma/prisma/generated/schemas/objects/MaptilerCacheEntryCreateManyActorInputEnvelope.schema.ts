import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntryCreateManyActorInputObjectSchema as MaptilerCacheEntryCreateManyActorInputObjectSchema } from './MaptilerCacheEntryCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MaptilerCacheEntryCreateManyActorInputObjectSchema), z.lazy(() => MaptilerCacheEntryCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MaptilerCacheEntryCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateManyActorInputEnvelope>;
export const MaptilerCacheEntryCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
