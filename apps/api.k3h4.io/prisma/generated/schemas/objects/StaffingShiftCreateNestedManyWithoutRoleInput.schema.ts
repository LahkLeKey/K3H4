import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutRoleInputObjectSchema as StaffingShiftCreateWithoutRoleInputObjectSchema } from './StaffingShiftCreateWithoutRoleInput.schema';
import { StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema as StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutRoleInput.schema';
import { StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema as StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutRoleInput.schema';
import { StaffingShiftCreateManyRoleInputEnvelopeObjectSchema as StaffingShiftCreateManyRoleInputEnvelopeObjectSchema } from './StaffingShiftCreateManyRoleInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyRoleInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftCreateNestedManyWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateNestedManyWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateNestedManyWithoutRoleInput>;
export const StaffingShiftCreateNestedManyWithoutRoleInputObjectZodSchema = makeSchema();
