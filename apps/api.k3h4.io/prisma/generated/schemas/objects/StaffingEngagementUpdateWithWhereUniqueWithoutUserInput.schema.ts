import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementUpdateWithoutUserInputObjectSchema as StaffingEngagementUpdateWithoutUserInputObjectSchema } from './StaffingEngagementUpdateWithoutUserInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingEngagementUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingEngagementUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateWithWhereUniqueWithoutUserInput>;
export const StaffingEngagementUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
