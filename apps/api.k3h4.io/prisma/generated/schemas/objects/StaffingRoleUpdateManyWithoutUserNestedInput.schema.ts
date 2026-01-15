import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutUserInputObjectSchema as StaffingRoleCreateWithoutUserInputObjectSchema } from './StaffingRoleCreateWithoutUserInput.schema';
import { StaffingRoleUncheckedCreateWithoutUserInputObjectSchema as StaffingRoleUncheckedCreateWithoutUserInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutUserInput.schema';
import { StaffingRoleCreateOrConnectWithoutUserInputObjectSchema as StaffingRoleCreateOrConnectWithoutUserInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutUserInput.schema';
import { StaffingRoleUpsertWithWhereUniqueWithoutUserInputObjectSchema as StaffingRoleUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingRoleUpsertWithWhereUniqueWithoutUserInput.schema';
import { StaffingRoleCreateManyUserInputEnvelopeObjectSchema as StaffingRoleCreateManyUserInputEnvelopeObjectSchema } from './StaffingRoleCreateManyUserInputEnvelope.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateWithWhereUniqueWithoutUserInputObjectSchema as StaffingRoleUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingRoleUpdateWithWhereUniqueWithoutUserInput.schema';
import { StaffingRoleUpdateManyWithWhereWithoutUserInputObjectSchema as StaffingRoleUpdateManyWithWhereWithoutUserInputObjectSchema } from './StaffingRoleUpdateManyWithWhereWithoutUserInput.schema';
import { StaffingRoleScalarWhereInputObjectSchema as StaffingRoleScalarWhereInputObjectSchema } from './StaffingRoleScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingRoleUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingRoleCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingRoleUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingRoleCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingRoleUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingRoleUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingRoleScalarWhereInputObjectSchema), z.lazy(() => StaffingRoleScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingRoleUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateManyWithoutUserNestedInput>;
export const StaffingRoleUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
