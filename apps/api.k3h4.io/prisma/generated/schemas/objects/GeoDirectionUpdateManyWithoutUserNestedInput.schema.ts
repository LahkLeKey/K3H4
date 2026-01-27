import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutUserInputObjectSchema as GeoDirectionCreateWithoutUserInputObjectSchema } from './GeoDirectionCreateWithoutUserInput.schema';
import { GeoDirectionUncheckedCreateWithoutUserInputObjectSchema as GeoDirectionUncheckedCreateWithoutUserInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutUserInput.schema';
import { GeoDirectionCreateOrConnectWithoutUserInputObjectSchema as GeoDirectionCreateOrConnectWithoutUserInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutUserInput.schema';
import { GeoDirectionUpsertWithWhereUniqueWithoutUserInputObjectSchema as GeoDirectionUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './GeoDirectionUpsertWithWhereUniqueWithoutUserInput.schema';
import { GeoDirectionCreateManyUserInputEnvelopeObjectSchema as GeoDirectionCreateManyUserInputEnvelopeObjectSchema } from './GeoDirectionCreateManyUserInputEnvelope.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithWhereUniqueWithoutUserInputObjectSchema as GeoDirectionUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './GeoDirectionUpdateWithWhereUniqueWithoutUserInput.schema';
import { GeoDirectionUpdateManyWithWhereWithoutUserInputObjectSchema as GeoDirectionUpdateManyWithWhereWithoutUserInputObjectSchema } from './GeoDirectionUpdateManyWithWhereWithoutUserInput.schema';
import { GeoDirectionScalarWhereInputObjectSchema as GeoDirectionScalarWhereInputObjectSchema } from './GeoDirectionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionCreateWithoutUserInputObjectSchema).array(), z.lazy(() => GeoDirectionUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoDirectionUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoDirectionUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoDirectionUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoDirectionScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyWithoutUserNestedInput>;
export const GeoDirectionUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
