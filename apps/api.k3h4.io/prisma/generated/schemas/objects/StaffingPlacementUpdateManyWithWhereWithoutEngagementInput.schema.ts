import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema';
import { StaffingPlacementUpdateManyMutationInputObjectSchema as StaffingPlacementUpdateManyMutationInputObjectSchema } from './StaffingPlacementUpdateManyMutationInput.schema';
import { StaffingPlacementUncheckedUpdateManyWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedUpdateManyWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedUpdateManyWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateManyMutationInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateManyWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateManyWithWhereWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateManyWithWhereWithoutEngagementInput>;
export const StaffingPlacementUpdateManyWithWhereWithoutEngagementInputObjectZodSchema = makeSchema();
