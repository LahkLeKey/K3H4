import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheCreateWithoutUserInputObjectSchema as GeoPoiCacheCreateWithoutUserInputObjectSchema } from './GeoPoiCacheCreateWithoutUserInput.schema';
import { GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema as GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedCreateWithoutUserInput.schema';
import { GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema as GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoPoiCacheCreateOrConnectWithoutUserInput.schema';
import { GeoPoiCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoPoiCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoPoiCacheUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema as GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoPoiCacheCreateManyUserInputEnvelope.schema';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoPoiCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoPoiCacheUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoPoiCacheUpdateManyWithWhereWithoutUserInputObjectSchema as GeoPoiCacheUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoPoiCacheUpdateManyWithWhereWithoutUserInput.schema';
import { GeoPoiCacheScalarWhereInputObjectSchema as GeoPoiCacheScalarWhereInputObjectSchema } from './GeoPoiCacheScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoPoiCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoPoiCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoPoiCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoPoiCacheUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema), z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoPoiCacheUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheUncheckedUpdateManyWithoutUserNestedInput>;
export const GeoPoiCacheUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
