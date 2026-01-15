import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutEngagementInputObjectSchema as StaffingRoleCreateWithoutEngagementInputObjectSchema } from './StaffingRoleCreateWithoutEngagementInput.schema';
import { StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema as StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutEngagementInput.schema';
import { StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema as StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutEngagementInput.schema';
import { StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema as StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema } from './StaffingRoleCreateManyEngagementInputEnvelope.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleCreateWithoutEngagementInputObjectSchema).array(), z.lazy(() => StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutEngagementInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema), z.lazy(() => StaffingRoleCreateOrConnectWithoutEngagementInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingRoleCreateManyEngagementInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingRoleCreateNestedManyWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateNestedManyWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateNestedManyWithoutEngagementInput>;
export const StaffingRoleCreateNestedManyWithoutEngagementInputObjectZodSchema = makeSchema();
