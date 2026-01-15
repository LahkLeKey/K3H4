import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingRoleUpdateWithoutPlacementsInputObjectSchema as StaffingRoleUpdateWithoutPlacementsInputObjectSchema } from './StaffingRoleUpdateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingRoleUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateToOneWithWhereWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateToOneWithWhereWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateToOneWithWhereWithoutPlacementsInput>;
export const StaffingRoleUpdateToOneWithWhereWithoutPlacementsInputObjectZodSchema = makeSchema();
