import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiCreateWithoutBuildingInputObjectSchema as PoiCreateWithoutBuildingInputObjectSchema } from './PoiCreateWithoutBuildingInput.schema';
import { PoiUncheckedCreateWithoutBuildingInputObjectSchema as PoiUncheckedCreateWithoutBuildingInputObjectSchema } from './PoiUncheckedCreateWithoutBuildingInput.schema';
import { PoiCreateOrConnectWithoutBuildingInputObjectSchema as PoiCreateOrConnectWithoutBuildingInputObjectSchema } from './PoiCreateOrConnectWithoutBuildingInput.schema';
import { PoiUpsertWithWhereUniqueWithoutBuildingInputObjectSchema as PoiUpsertWithWhereUniqueWithoutBuildingInputObjectSchema } from './PoiUpsertWithWhereUniqueWithoutBuildingInput.schema';
import { PoiCreateManyBuildingInputEnvelopeObjectSchema as PoiCreateManyBuildingInputEnvelopeObjectSchema } from './PoiCreateManyBuildingInputEnvelope.schema';
import { PoiWhereUniqueInputObjectSchema as PoiWhereUniqueInputObjectSchema } from './PoiWhereUniqueInput.schema';
import { PoiUpdateWithWhereUniqueWithoutBuildingInputObjectSchema as PoiUpdateWithWhereUniqueWithoutBuildingInputObjectSchema } from './PoiUpdateWithWhereUniqueWithoutBuildingInput.schema';
import { PoiUpdateManyWithWhereWithoutBuildingInputObjectSchema as PoiUpdateManyWithWhereWithoutBuildingInputObjectSchema } from './PoiUpdateManyWithWhereWithoutBuildingInput.schema';
import { PoiScalarWhereInputObjectSchema as PoiScalarWhereInputObjectSchema } from './PoiScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PoiCreateWithoutBuildingInputObjectSchema), z.lazy(() => PoiCreateWithoutBuildingInputObjectSchema).array(), z.lazy(() => PoiUncheckedCreateWithoutBuildingInputObjectSchema), z.lazy(() => PoiUncheckedCreateWithoutBuildingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PoiCreateOrConnectWithoutBuildingInputObjectSchema), z.lazy(() => PoiCreateOrConnectWithoutBuildingInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PoiUpsertWithWhereUniqueWithoutBuildingInputObjectSchema), z.lazy(() => PoiUpsertWithWhereUniqueWithoutBuildingInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PoiCreateManyBuildingInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PoiWhereUniqueInputObjectSchema), z.lazy(() => PoiWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PoiWhereUniqueInputObjectSchema), z.lazy(() => PoiWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PoiWhereUniqueInputObjectSchema), z.lazy(() => PoiWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PoiWhereUniqueInputObjectSchema), z.lazy(() => PoiWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PoiUpdateWithWhereUniqueWithoutBuildingInputObjectSchema), z.lazy(() => PoiUpdateWithWhereUniqueWithoutBuildingInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PoiUpdateManyWithWhereWithoutBuildingInputObjectSchema), z.lazy(() => PoiUpdateManyWithWhereWithoutBuildingInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PoiScalarWhereInputObjectSchema), z.lazy(() => PoiScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PoiUpdateManyWithoutBuildingNestedInputObjectSchema: z.ZodType<Prisma.PoiUpdateManyWithoutBuildingNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiUpdateManyWithoutBuildingNestedInput>;
export const PoiUpdateManyWithoutBuildingNestedInputObjectZodSchema = makeSchema();
