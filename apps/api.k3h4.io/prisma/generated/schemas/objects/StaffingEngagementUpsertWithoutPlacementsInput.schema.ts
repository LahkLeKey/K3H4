import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementUpdateWithoutPlacementsInputObjectSchema as StaffingEngagementUpdateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUpdateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutPlacementsInput.schema';
import { StaffingEngagementCreateWithoutPlacementsInputObjectSchema as StaffingEngagementCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingEngagementUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema)]),
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional()
}).strict();
export const StaffingEngagementUpsertWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpsertWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpsertWithoutPlacementsInput>;
export const StaffingEngagementUpsertWithoutPlacementsInputObjectZodSchema = makeSchema();
