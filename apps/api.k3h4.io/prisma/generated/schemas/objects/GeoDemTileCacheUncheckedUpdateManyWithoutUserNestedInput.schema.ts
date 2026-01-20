import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheCreateWithoutUserInputObjectSchema as GeoDemTileCacheCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedCreateWithoutUserInput.schema';
import { GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema as GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateOrConnectWithoutUserInput.schema';
import { GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema as GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema } from './GeoDemTileCacheCreateManyUserInputEnvelope.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoDemTileCacheUpdateManyWithWhereWithoutUserInputObjectSchema as GeoDemTileCacheUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoDemTileCacheUpdateManyWithWhereWithoutUserInput.schema';
import { GeoDemTileCacheScalarWhereInputObjectSchema as GeoDemTileCacheScalarWhereInputObjectSchema } from './GeoDemTileCacheScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDemTileCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema), z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoDemTileCacheUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema), z.lazy(() => GeoDemTileCacheScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoDemTileCacheUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheUncheckedUpdateManyWithoutUserNestedInput>;
export const GeoDemTileCacheUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
