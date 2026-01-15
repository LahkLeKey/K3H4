import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema';
import { StaffingShiftUpdateManyMutationInputObjectSchema as StaffingShiftUpdateManyMutationInputObjectSchema } from './StaffingShiftUpdateManyMutationInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInput>;
export const StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInputObjectZodSchema = makeSchema();
