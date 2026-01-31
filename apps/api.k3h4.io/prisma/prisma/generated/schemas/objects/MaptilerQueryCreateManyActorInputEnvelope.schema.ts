import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryCreateManyActorInputObjectSchema as MaptilerQueryCreateManyActorInputObjectSchema } from './MaptilerQueryCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => MaptilerQueryCreateManyActorInputObjectSchema), z.lazy(() => MaptilerQueryCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const MaptilerQueryCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateManyActorInputEnvelope>;
export const MaptilerQueryCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
