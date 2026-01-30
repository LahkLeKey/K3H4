import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheCreateWithoutUserInputObjectSchema as GeoQueryCacheCreateWithoutUserInputObjectSchema } from './GeoQueryCacheCreateWithoutUserInput.schema';
import { GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema as GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedCreateWithoutUserInput.schema';
import { GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema as GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoQueryCacheCreateOrConnectWithoutUserInput.schema';
import { GeoQueryCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoQueryCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoQueryCacheUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema as GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoQueryCacheCreateManyUserInputEnvelope.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoQueryCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoQueryCacheUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoQueryCacheUpdateManyWithWhereWithoutUserInputObjectSchema as GeoQueryCacheUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoQueryCacheUpdateManyWithWhereWithoutUserInput.schema';
import { GeoQueryCacheScalarWhereInputObjectSchema as GeoQueryCacheScalarWhereInputObjectSchema } from './GeoQueryCacheScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoQueryCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoQueryCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoQueryCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoQueryCacheUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema), z.lazy(() => GeoQueryCacheScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoQueryCacheUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheUpdateManyWithoutUserNestedInput>;
export const GeoQueryCacheUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
