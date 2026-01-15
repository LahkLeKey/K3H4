import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementUpdateWithoutCandidatesInputObjectSchema as StaffingEngagementUpdateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUpdateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutCandidatesInput.schema';
import { StaffingEngagementCreateWithoutCandidatesInputObjectSchema as StaffingEngagementCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutCandidatesInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingEngagementUpdateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema)]),
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional()
}).strict();
export const StaffingEngagementUpsertWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpsertWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpsertWithoutCandidatesInput>;
export const StaffingEngagementUpsertWithoutCandidatesInputObjectZodSchema = makeSchema();
