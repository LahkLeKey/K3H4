import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema';
import { StaffingShiftUpdateManyMutationInputObjectSchema as StaffingShiftUpdateManyMutationInputObjectSchema } from './StaffingShiftUpdateManyMutationInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutRoleInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutRoleInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateManyWithWhereWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutRoleInput>;
export const StaffingShiftUpdateManyWithWhereWithoutRoleInputObjectZodSchema = makeSchema();
