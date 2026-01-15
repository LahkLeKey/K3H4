import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutCandidatesInputObjectSchema as StaffingEngagementCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutCandidatesInput.schema';
import { StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema as StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutCandidatesInput.schema';
import { StaffingEngagementUpsertWithoutCandidatesInputObjectSchema as StaffingEngagementUpsertWithoutCandidatesInputObjectSchema } from './StaffingEngagementUpsertWithoutCandidatesInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInputObjectSchema as StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInputObjectSchema } from './StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInput.schema';
import { StaffingEngagementUpdateWithoutCandidatesInputObjectSchema as StaffingEngagementUpdateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUpdateWithoutCandidatesInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutCandidatesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingEngagementCreateOrConnectWithoutCandidatesInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingEngagementUpsertWithoutCandidatesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingEngagementUpdateToOneWithWhereWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUpdateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutCandidatesInputObjectSchema)]).optional()
}).strict();
export const StaffingEngagementUpdateOneWithoutCandidatesNestedInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateOneWithoutCandidatesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateOneWithoutCandidatesNestedInput>;
export const StaffingEngagementUpdateOneWithoutCandidatesNestedInputObjectZodSchema = makeSchema();
