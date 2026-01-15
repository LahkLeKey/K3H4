import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutRoleInputObjectSchema as StaffingPlacementUpdateWithoutRoleInputObjectSchema } from './StaffingPlacementUpdateWithoutRoleInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutRoleInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateWithWhereUniqueWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutRoleInput>;
export const StaffingPlacementUpdateWithWhereUniqueWithoutRoleInputObjectZodSchema = makeSchema();
