import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiCreateManyBuildingInputObjectSchema as PoiCreateManyBuildingInputObjectSchema } from './PoiCreateManyBuildingInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PoiCreateManyBuildingInputObjectSchema), z.lazy(() => PoiCreateManyBuildingInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PoiCreateManyBuildingInputEnvelopeObjectSchema: z.ZodType<Prisma.PoiCreateManyBuildingInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PoiCreateManyBuildingInputEnvelope>;
export const PoiCreateManyBuildingInputEnvelopeObjectZodSchema = makeSchema();
