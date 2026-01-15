import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementCreateWithoutRoleInputObjectSchema as StaffingPlacementCreateWithoutRoleInputObjectSchema } from './StaffingPlacementCreateWithoutRoleInput.schema';
import { StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema as StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutRoleInput>;
export const StaffingPlacementCreateOrConnectWithoutRoleInputObjectZodSchema = makeSchema();
