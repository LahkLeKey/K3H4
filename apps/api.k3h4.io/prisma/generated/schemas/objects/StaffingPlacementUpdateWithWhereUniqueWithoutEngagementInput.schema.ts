import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutEngagementInputObjectSchema as StaffingPlacementUpdateWithoutEngagementInputObjectSchema } from './StaffingPlacementUpdateWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingPlacementUpdateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInput>;
export const StaffingPlacementUpdateWithWhereUniqueWithoutEngagementInputObjectZodSchema = makeSchema();
