import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutUserInputObjectSchema as StaffingPlacementCreateWithoutUserInputObjectSchema } from './StaffingPlacementCreateWithoutUserInput.schema';
import { StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema as StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutUserInput.schema';
import { StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema as StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutUserInput.schema';
import { StaffingPlacementUpsertWithWhereUniqueWithoutUserInputObjectSchema as StaffingPlacementUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingPlacementUpsertWithWhereUniqueWithoutUserInput.schema';
import { StaffingPlacementCreateManyUserInputEnvelopeObjectSchema as StaffingPlacementCreateManyUserInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyUserInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithWhereUniqueWithoutUserInputObjectSchema as StaffingPlacementUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingPlacementUpdateWithWhereUniqueWithoutUserInput.schema';
import { StaffingPlacementUpdateManyWithWhereWithoutUserInputObjectSchema as StaffingPlacementUpdateManyWithWhereWithoutUserInputObjectSchema } from './StaffingPlacementUpdateManyWithWhereWithoutUserInput.schema';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema), z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutUserNestedInput>;
export const StaffingPlacementUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
