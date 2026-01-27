import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopCreateManyDirectionInputObjectSchema as GeoDirectionStopCreateManyDirectionInputObjectSchema } from './GeoDirectionStopCreateManyDirectionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoDirectionStopCreateManyDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopCreateManyDirectionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoDirectionStopCreateManyDirectionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopCreateManyDirectionInputEnvelope>;
export const GeoDirectionStopCreateManyDirectionInputEnvelopeObjectZodSchema = makeSchema();
