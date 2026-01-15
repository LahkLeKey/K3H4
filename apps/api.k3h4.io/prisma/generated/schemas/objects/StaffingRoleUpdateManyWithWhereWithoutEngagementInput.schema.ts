import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleScalarWhereInputObjectSchema as StaffingRoleScalarWhereInputObjectSchema } from './StaffingRoleScalarWhereInput.schema';
import { StaffingRoleUpdateManyMutationInputObjectSchema as StaffingRoleUpdateManyMutationInputObjectSchema } from './StaffingRoleUpdateManyMutationInput.schema';
import { StaffingRoleUncheckedUpdateManyWithoutEngagementInputObjectSchema as StaffingRoleUncheckedUpdateManyWithoutEngagementInputObjectSchema } from './StaffingRoleUncheckedUpdateManyWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingRoleUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateManyWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateManyWithWhereWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateManyWithWhereWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateManyWithWhereWithoutEngagementInput>;
export const StaffingRoleUpdateManyWithWhereWithoutEngagementInputObjectZodSchema = makeSchema();
