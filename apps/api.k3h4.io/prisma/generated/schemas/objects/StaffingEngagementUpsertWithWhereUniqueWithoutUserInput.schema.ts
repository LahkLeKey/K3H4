import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementUpdateWithoutUserInputObjectSchema as StaffingEngagementUpdateWithoutUserInputObjectSchema } from './StaffingEngagementUpdateWithoutUserInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutUserInput.schema';
import { StaffingEngagementCreateWithoutUserInputObjectSchema as StaffingEngagementCreateWithoutUserInputObjectSchema } from './StaffingEngagementCreateWithoutUserInput.schema';
import { StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema as StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingEngagementUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingEngagementUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpsertWithWhereUniqueWithoutUserInput>;
export const StaffingEngagementUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
