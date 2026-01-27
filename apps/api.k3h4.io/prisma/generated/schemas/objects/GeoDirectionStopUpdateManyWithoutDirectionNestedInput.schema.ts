import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopCreateWithoutDirectionInputObjectSchema as GeoDirectionStopCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopCreateWithoutDirectionInput.schema';
import { GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedCreateWithoutDirectionInput.schema';
import { GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema as GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema } from './GeoDirectionStopCreateOrConnectWithoutDirectionInput.schema';
import { GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInputObjectSchema as GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInputObjectSchema } from './GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInput.schema';
import { GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema as GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema } from './GeoDirectionStopCreateManyDirectionInputEnvelope.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './GeoDirectionStopWhereUniqueInput.schema';
import { GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInputObjectSchema as GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInputObjectSchema } from './GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInput.schema';
import { GeoDirectionStopUpdateManyWithWhereWithoutDirectionInputObjectSchema as GeoDirectionStopUpdateManyWithWhereWithoutDirectionInputObjectSchema } from './GeoDirectionStopUpdateManyWithWhereWithoutDirectionInput.schema';
import { GeoDirectionStopScalarWhereInputObjectSchema as GeoDirectionStopScalarWhereInputObjectSchema } from './GeoDirectionStopScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionStopCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopCreateWithoutDirectionInputObjectSchema).array(), z.lazy(() => GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => GeoDirectionStopCreateManyDirectionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema), z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => GeoDirectionStopUpdateManyWithWhereWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUpdateManyWithWhereWithoutDirectionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const GeoDirectionStopUpdateManyWithoutDirectionNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopUpdateManyWithoutDirectionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopUpdateManyWithoutDirectionNestedInput>;
export const GeoDirectionStopUpdateManyWithoutDirectionNestedInputObjectZodSchema = makeSchema();
