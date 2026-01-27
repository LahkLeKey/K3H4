import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionUpdateWithoutSegmentsInputObjectSchema as GeoDirectionUpdateWithoutSegmentsInputObjectSchema } from './GeoDirectionUpdateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutSegmentsInput.schema';
import { GeoDirectionCreateWithoutSegmentsInputObjectSchema as GeoDirectionCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutSegmentsInput.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => GeoDirectionUpdateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema)]),
  where: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionUpsertWithoutSegmentsInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpsertWithoutSegmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpsertWithoutSegmentsInput>;
export const GeoDirectionUpsertWithoutSegmentsInputObjectZodSchema = makeSchema();
