import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementCreateWithoutEngagementInputObjectSchema as StaffingPlacementCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementCreateWithoutEngagementInput.schema';
import { StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema as StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutEngagementInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutEngagementInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutEngagementInputObjectSchema)])
}).strict();
export const StaffingPlacementCreateOrConnectWithoutEngagementInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutEngagementInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateOrConnectWithoutEngagementInput>;
export const StaffingPlacementCreateOrConnectWithoutEngagementInputObjectZodSchema = makeSchema();
