import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCreateWithoutPlacementsInputObjectSchema as StaffingRoleCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema)])
}).strict();
export const StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutPlacementsInput>;
export const StaffingRoleCreateOrConnectWithoutPlacementsInputObjectZodSchema = makeSchema();
