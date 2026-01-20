import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogCreateWithoutUserInputObjectSchema as GeoStatusLogCreateWithoutUserInputObjectSchema } from './GeoStatusLogCreateWithoutUserInput.schema';
import { GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema as GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedCreateWithoutUserInput.schema';
import { GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema as GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema } from './GeoStatusLogCreateOrConnectWithoutUserInput.schema';
import { GeoStatusLogUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoStatusLogUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoStatusLogUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoStatusLogCreateManyUserInputEnvelopeObjectSchema as GeoStatusLogCreateManyUserInputEnvelopeObjectSchema } from './GeoStatusLogCreateManyUserInputEnvelope.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoStatusLogUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoStatusLogUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoStatusLogUpdateManyWithWhereWithoutUserInputObjectSchema as GeoStatusLogUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoStatusLogUpdateManyWithWhereWithoutUserInput.schema';
import { GeoStatusLogScalarWhereInputObjectSchema as GeoStatusLogScalarWhereInputObjectSchema } from './GeoStatusLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoStatusLogCreateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoStatusLogUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoStatusLogCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema), z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema), z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema), z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema), z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoStatusLogUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoStatusLogUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema), z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoStatusLogUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoStatusLogUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogUpdateManyWithoutUserNestedInput>;
export const GeoStatusLogUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
