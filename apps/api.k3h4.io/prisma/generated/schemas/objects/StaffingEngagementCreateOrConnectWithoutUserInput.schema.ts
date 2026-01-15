import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementCreateWithoutUserInputObjectSchema as StaffingEngagementCreateWithoutUserInputObjectSchema } from './StaffingEngagementCreateWithoutUserInput.schema';
import { StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema as StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingEngagementCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutUserInput>;
export const StaffingEngagementCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
