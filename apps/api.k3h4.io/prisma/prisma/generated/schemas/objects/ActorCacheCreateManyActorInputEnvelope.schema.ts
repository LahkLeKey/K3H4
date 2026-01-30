import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheCreateManyActorInputObjectSchema as ActorCacheCreateManyActorInputObjectSchema } from './ActorCacheCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ActorCacheCreateManyActorInputObjectSchema), z.lazy(() => ActorCacheCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ActorCacheCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.ActorCacheCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheCreateManyActorInputEnvelope>;
export const ActorCacheCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
