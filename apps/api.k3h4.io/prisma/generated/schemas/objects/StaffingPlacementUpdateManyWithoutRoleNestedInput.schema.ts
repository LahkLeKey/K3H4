import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutRoleInputObjectSchema as StaffingPlacementCreateWithoutRoleInputObjectSchema } from './StaffingPlacementCreateWithoutRoleInput.schema';
import { StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema as StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutRoleInput.schema';
import { StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema as StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutRoleInput.schema';
import { StaffingPlacementUpsertWithWhereUniqueWithoutRoleInputObjectSchema as StaffingPlacementUpsertWithWhereUniqueWithoutRoleInputObjectSchema } from './StaffingPlacementUpsertWithWhereUniqueWithoutRoleInput.schema';
import { StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema as StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyRoleInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithWhereUniqueWithoutRoleInputObjectSchema as StaffingPlacementUpdateWithWhereUniqueWithoutRoleInputObjectSchema } from './StaffingPlacementUpdateWithWhereUniqueWithoutRoleInput.schema';
import { StaffingPlacementUpdateManyWithWhereWithoutRoleInputObjectSchema as StaffingPlacementUpdateManyWithWhereWithoutRoleInputObjectSchema } from './StaffingPlacementUpdateManyWithWhereWithoutRoleInput.schema';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutRoleInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema), z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUpdateManyWithoutRoleNestedInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutRoleNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithoutRoleNestedInput>;
export const StaffingPlacementUpdateManyWithoutRoleNestedInputObjectZodSchema = makeSchema();
