import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutRoleInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutRoleInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutRoleInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateManyWithWhereWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutRoleInput>;
export const StaffingPlacementUpdateManyWithWhereWithoutRoleInputObjectZodSchema = makeSchema();
