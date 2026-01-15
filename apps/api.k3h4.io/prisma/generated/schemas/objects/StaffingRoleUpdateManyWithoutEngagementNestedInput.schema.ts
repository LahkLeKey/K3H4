import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutEngagementInputObjectSchema as StaffingRoleCreateWithoutEngagementInputObjectSchema } from './StaffingRoleCreateWithoutEngagementInput.schema';
import { StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema as StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutEngagementInput.schema';
import { StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema as StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutEngagementInput.schema';
import { StaffingRoleUpsertWithWhereUniqueWithoutEngagementInputObjectSchema as StaffingRoleUpsertWithWhereUniqueWithoutEngagementInputObjectSchema } from './StaffingRoleUpsertWithWhereUniqueWithoutEngagementInput.schema';
import { StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema as StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema } from './StaffingRoleCreateManyEngagementInputEnvelope.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateWithWhereUniqueWithoutEngagementInputObjectSchema as StaffingRoleUpdateWithWhereUniqueWithoutEngagementInputObjectSchema } from './StaffingRoleUpdateWithWhereUniqueWithoutEngagementInput.schema';
import { StaffingRoleUpdateManyWithWhereWithoutEngagementInputObjectSchema as StaffingRoleUpdateManyWithWhereWithoutEngagementInputObjectSchema } from './StaffingRoleUpdateManyWithWhereWithoutEngagementInput.schema';
import { StaffingRoleScalarWhereInputObjectSchema as StaffingRoleScalarWhereInputObjectSchema } from './StaffingRoleScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleCreateWithoutEngagementInputObjectSchema).array(), z.lazy(() => StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingRoleUpsertWithWhereUniqueWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUpsertWithWhereUniqueWithoutEngagementInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingRoleUpdateWithWhereUniqueWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUpdateWithWhereUniqueWithoutEngagementInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingRoleUpdateManyWithWhereWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUpdateManyWithWhereWithoutEngagementInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingRoleScalarWhereInputObjectSchema), z.lazy(() => StaffingRoleScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingRoleUpdateManyWithoutEngagementNestedInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateManyWithoutEngagementNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateManyWithoutEngagementNestedInput>;
export const StaffingRoleUpdateManyWithoutEngagementNestedInputObjectZodSchema = makeSchema();
