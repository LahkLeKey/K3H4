import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutSegmentsInputObjectSchema as GeoDirectionCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutSegmentsInput.schema';
import { GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema as GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutSegmentsInput.schema';
import { GeoDirectionUpsertWithoutSegmentsInputObjectSchema as GeoDirectionUpsertWithoutSegmentsInputObjectSchema } from './GeoDirectionUpsertWithoutSegmentsInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateToOneWithWhereWithoutSegmentsInputObjectSchema as GeoDirectionUpdateToOneWithWhereWithoutSegmentsInputObjectSchema } from './GeoDirectionUpdateToOneWithWhereWithoutSegmentsInput.schema';
import { GeoDirectionUpdateWithoutSegmentsInputObjectSchema as GeoDirectionUpdateWithoutSegmentsInputObjectSchema } from './GeoDirectionUpdateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutSegmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => GeoDirectionUpsertWithoutSegmentsInputObjectSchema).optional(),
  connect: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => GeoDirectionUpdateToOneWithWhereWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUpdateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutSegmentsInputObjectSchema)]).optional()
}).strict();
export const GeoDirectionUpdateOneRequiredWithoutSegmentsNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateOneRequiredWithoutSegmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateOneRequiredWithoutSegmentsNestedInput>;
export const GeoDirectionUpdateOneRequiredWithoutSegmentsNestedInputObjectZodSchema = makeSchema();
