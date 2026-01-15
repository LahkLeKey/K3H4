import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutRoleInputObjectSchema as StaffingPlacementUpdateWithoutRoleInputObjectSchema } from './StaffingPlacementUpdateWithoutRoleInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutRoleInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutRoleInput.schema';
import { StaffingPlacementCreateWithoutRoleInputObjectSchema as StaffingPlacementCreateWithoutRoleInputObjectSchema } from './StaffingPlacementCreateWithoutRoleInput.schema';
import { StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema as StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutRoleInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingPlacementUpsertWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutRoleInput>;
export const StaffingPlacementUpsertWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
