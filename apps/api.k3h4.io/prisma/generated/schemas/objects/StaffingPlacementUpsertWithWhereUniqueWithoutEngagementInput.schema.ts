import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithoutEngagementInputObjectSchema as StaffingPlacementUpdateWithoutEngagementInputObjectSchema } from './StaffingPlacementUpdateWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedUpdateWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedUpdateWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedUpdateWithoutEngagementInput.schema';
import { StaffingPlacementCreateWithoutEngagementInputObjectSchema as StaffingPlacementCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedUpdateWithoutEngagementInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInput>;
export const StaffingPlacementUpsertWithWhereUniqueWithoutEngagementInputObjectZodSchema = makeSchema();
