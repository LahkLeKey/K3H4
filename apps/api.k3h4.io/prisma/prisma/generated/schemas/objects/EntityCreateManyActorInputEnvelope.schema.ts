import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCreateManyActorInputObjectSchema as EntityCreateManyActorInputObjectSchema } from './EntityCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => EntityCreateManyActorInputObjectSchema), z.lazy(() => EntityCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const EntityCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.EntityCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.EntityCreateManyActorInputEnvelope>;
export const EntityCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
