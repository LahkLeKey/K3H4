import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleUpdateWithoutPlacementsInputObjectSchema as StaffingRoleUpdateWithoutPlacementsInputObjectSchema } from './StaffingRoleUpdateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutPlacementsInput.schema';
import { StaffingRoleCreateWithoutPlacementsInputObjectSchema as StaffingRoleCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingRoleUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema)]),
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional()
}).strict();
export const StaffingRoleUpsertWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpsertWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpsertWithoutPlacementsInput>;
export const StaffingRoleUpsertWithoutPlacementsInputObjectZodSchema = makeSchema();
