import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCreateWithoutUserInputObjectSchema as GeoRouteCacheCreateWithoutUserInputObjectSchema } from './GeoRouteCacheCreateWithoutUserInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutUserInput.schema';
import { GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema as GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoRouteCacheCreateOrConnectWithoutUserInput.schema';
import { GeoRouteCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoRouteCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoRouteCacheUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema as GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoRouteCacheCreateManyUserInputEnvelope.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoRouteCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoRouteCacheUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoRouteCacheUpdateManyWithWhereWithoutUserInputObjectSchema as GeoRouteCacheUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoRouteCacheUpdateManyWithWhereWithoutUserInput.schema';
import { GeoRouteCacheScalarWhereInputObjectSchema as GeoRouteCacheScalarWhereInputObjectSchema } from './GeoRouteCacheScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoRouteCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoRouteCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoRouteCacheUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoRouteCacheScalarWhereInputObjectSchema), z.lazy(() => GeoRouteCacheScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoRouteCacheUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUncheckedUpdateManyWithoutUserNestedInput>;
export const GeoRouteCacheUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
