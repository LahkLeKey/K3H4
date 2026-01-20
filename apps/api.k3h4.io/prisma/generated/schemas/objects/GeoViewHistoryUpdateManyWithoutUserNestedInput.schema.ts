import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryCreateWithoutUserInputObjectSchema as GeoViewHistoryCreateWithoutUserInputObjectSchema } from './GeoViewHistoryCreateWithoutUserInput.schema';
import { GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema as GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedCreateWithoutUserInput.schema';
import { GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema as GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema } from './GeoViewHistoryCreateOrConnectWithoutUserInput.schema';
import { GeoViewHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoViewHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoViewHistoryUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema as GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema } from './GeoViewHistoryCreateManyUserInputEnvelope.schema';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoViewHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoViewHistoryUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoViewHistoryUpdateManyWithWhereWithoutUserInputObjectSchema as GeoViewHistoryUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoViewHistoryUpdateManyWithWhereWithoutUserInput.schema';
import { GeoViewHistoryScalarWhereInputObjectSchema as GeoViewHistoryScalarWhereInputObjectSchema } from './GeoViewHistoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoViewHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoViewHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema), z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema), z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema), z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema), z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoViewHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoViewHistoryUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoViewHistoryScalarWhereInputObjectSchema), z.lazy(() => GeoViewHistoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoViewHistoryUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryUpdateManyWithoutUserNestedInput>;
export const GeoViewHistoryUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
