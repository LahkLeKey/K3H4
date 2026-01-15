import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementCreateWithoutPlacementsInputObjectSchema as StaffingEngagementCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema)])
}).strict();
export const StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutPlacementsInput>;
export const StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectZodSchema = makeSchema();
