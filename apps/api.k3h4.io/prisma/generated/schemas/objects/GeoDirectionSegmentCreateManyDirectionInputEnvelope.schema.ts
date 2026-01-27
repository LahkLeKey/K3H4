import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentCreateManyDirectionInputObjectSchema as GeoDirectionSegmentCreateManyDirectionInputObjectSchema } from './GeoDirectionSegmentCreateManyDirectionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoDirectionSegmentCreateManyDirectionInputObjectSchema), z.lazy(() => GeoDirectionSegmentCreateManyDirectionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentCreateManyDirectionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateManyDirectionInputEnvelope>;
export const GeoDirectionSegmentCreateManyDirectionInputEnvelopeObjectZodSchema = makeSchema();
