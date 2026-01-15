import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema';
import { StaffingShiftUpdateManyMutationInputObjectSchema as StaffingShiftUpdateManyMutationInputObjectSchema } from './StaffingShiftUpdateManyMutationInput.schema';
import { StaffingShiftUncheckedUpdateManyWithoutUserInputObjectSchema as StaffingShiftUncheckedUpdateManyWithoutUserInputObjectSchema } from './StaffingShiftUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingShiftUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingShiftUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const StaffingShiftUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyWithWhereWithoutUserInput>;
export const StaffingShiftUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
