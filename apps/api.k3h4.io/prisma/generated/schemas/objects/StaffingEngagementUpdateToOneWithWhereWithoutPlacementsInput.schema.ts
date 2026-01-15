import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingEngagementUpdateWithoutPlacementsInputObjectSchema as StaffingEngagementUpdateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUpdateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingEngagementUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema)])
}).strict();
export const StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInput>;
export const StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInputObjectZodSchema = makeSchema();
