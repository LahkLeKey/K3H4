import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutPlacementsInputObjectSchema as StaffingRoleCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema as StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutPlacementsInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingRoleCreateNestedOneWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateNestedOneWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateNestedOneWithoutPlacementsInput>;
export const StaffingRoleCreateNestedOneWithoutPlacementsInputObjectZodSchema = makeSchema();
