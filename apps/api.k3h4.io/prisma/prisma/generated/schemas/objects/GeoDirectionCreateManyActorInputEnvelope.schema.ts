import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateManyActorInputObjectSchema as GeoDirectionCreateManyActorInputObjectSchema } from './GeoDirectionCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoDirectionCreateManyActorInputObjectSchema), z.lazy(() => GeoDirectionCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoDirectionCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoDirectionCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateManyActorInputEnvelope>;
export const GeoDirectionCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
