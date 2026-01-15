import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementCreateWithoutCandidatesInputObjectSchema as StaffingEngagementCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema)])
}).strict();
export const StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutCandidatesInput>;
export const StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectZodSchema = makeSchema();
