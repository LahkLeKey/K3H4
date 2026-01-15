import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleScalarWhereInputObjectSchema as StaffingRoleScalarWhereInputObjectSchema } from './StaffingRoleScalarWhereInput.schema';
import { StaffingRoleUpdateManyMutationInputObjectSchema as StaffingRoleUpdateManyMutationInputObjectSchema } from './StaffingRoleUpdateManyMutationInput.schema';
import { StaffingRoleUncheckedUpdateManyWithoutUserInputObjectSchema as StaffingRoleUncheckedUpdateManyWithoutUserInputObjectSchema } from './StaffingRoleUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingRoleUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateManyWithWhereWithoutUserInput>;
export const StaffingRoleUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
