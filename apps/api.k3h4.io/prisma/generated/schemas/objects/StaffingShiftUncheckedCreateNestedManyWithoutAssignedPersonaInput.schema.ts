import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateWithoutAssignedPersonaInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedPersonaInput.schema';
import { StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutAssignedPersonaInput.schema';
import { StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema as StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema } from './StaffingShiftCreateManyAssignedPersonaInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInput>;
export const StaffingShiftUncheckedCreateNestedManyWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
