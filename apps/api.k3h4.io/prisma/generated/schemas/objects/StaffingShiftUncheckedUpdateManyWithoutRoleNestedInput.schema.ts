import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutRoleInputObjectSchema as StaffingShiftCreateWithoutRoleInputObjectSchema } from './StaffingShiftCreateWithoutRoleInput.schema';
import { StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema as StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutRoleInput.schema';
import { StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema as StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutRoleInput.schema';
import { StaffingShiftUpsertWithWhereUniqueWithoutRoleInputObjectSchema as StaffingShiftUpsertWithWhereUniqueWithoutRoleInputObjectSchema } from './StaffingShiftUpsertWithWhereUniqueWithoutRoleInput.schema';
import { StaffingShiftCreateManyRoleInputEnvelopeObjectSchema as StaffingShiftCreateManyRoleInputEnvelopeObjectSchema } from './StaffingShiftCreateManyRoleInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithWhereUniqueWithoutRoleInputObjectSchema as StaffingShiftUpdateWithWhereUniqueWithoutRoleInputObjectSchema } from './StaffingShiftUpdateWithWhereUniqueWithoutRoleInput.schema';
import { StaffingShiftUpdateManyWithWhereWithoutRoleInputObjectSchema as StaffingShiftUpdateManyWithWhereWithoutRoleInputObjectSchema } from './StaffingShiftUpdateManyWithWhereWithoutRoleInput.schema';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyRoleInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutRoleInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutRoleInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingShiftScalarWhereInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftUncheckedUpdateManyWithoutRoleNestedInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedUpdateManyWithoutRoleNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedUpdateManyWithoutRoleNestedInput>;
export const StaffingShiftUncheckedUpdateManyWithoutRoleNestedInputObjectZodSchema = makeSchema();
