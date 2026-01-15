import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingEngagementUpdateWithoutCandidatesInputObjectSchema as StaffingEngagementUpdateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUpdateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingEngagementUpdateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema)])
}).strict();
export const StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInput>;
export const StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInputObjectZodSchema = makeSchema();
