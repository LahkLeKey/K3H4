import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema';
import { GeoDirectionUpdateWithoutSegmentsInputObjectSchema as GeoDirectionUpdateWithoutSegmentsInputObjectSchema } from './GeoDirectionUpdateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutSegmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => GeoDirectionUpdateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateToOneWithWhereWithoutSegmentsInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateToOneWithWhereWithoutSegmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateToOneWithWhereWithoutSegmentsInput>;
export const GeoDirectionUpdateToOneWithWhereWithoutSegmentsInputObjectZodSchema = makeSchema();
