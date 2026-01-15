import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutUserInputObjectSchema as StaffingRoleCreateWithoutUserInputObjectSchema } from './StaffingRoleCreateWithoutUserInput.schema';
import { StaffingRoleUncheckedCreateWithoutUserInputObjectSchema as StaffingRoleUncheckedCreateWithoutUserInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutUserInput.schema';
import { StaffingRoleCreateOrConnectWithoutUserInputObjectSchema as StaffingRoleCreateOrConnectWithoutUserInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutUserInput.schema';
import { StaffingRoleCreateManyUserInputEnvelopeObjectSchema as StaffingRoleCreateManyUserInputEnvelopeObjectSchema } from './StaffingRoleCreateManyUserInputEnvelope.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingRoleUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingRoleCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingRoleCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema), z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingRoleCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateNestedManyWithoutUserInput>;
export const StaffingRoleCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
