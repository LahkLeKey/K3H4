import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutPlacementsInputObjectSchema as StaffingEngagementCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema as StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutPlacementsInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCreateNestedOneWithoutPlacementsInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateNestedOneWithoutPlacementsInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateNestedOneWithoutPlacementsInput>;
export const StaffingEngagementCreateNestedOneWithoutPlacementsInputObjectZodSchema = makeSchema();
