import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutCandidatesInputObjectSchema as StaffingEngagementCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutCandidatesInput.schema';
import { StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema as StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutCandidatesInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCreateNestedOneWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateNestedOneWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateNestedOneWithoutCandidatesInput>;
export const StaffingEngagementCreateNestedOneWithoutCandidatesInputObjectZodSchema = makeSchema();
