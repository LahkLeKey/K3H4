import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateWithoutAssignedPersonaInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema)])
}).strict();
export const StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutAssignedPersonaInput>;
export const StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
