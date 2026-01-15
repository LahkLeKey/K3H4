import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleUpdateWithoutCandidatesInputObjectSchema as StaffingRoleUpdateWithoutCandidatesInputObjectSchema } from './StaffingRoleUpdateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutCandidatesInput.schema';
import { StaffingRoleCreateWithoutCandidatesInputObjectSchema as StaffingRoleCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleCreateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutCandidatesInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingRoleUpdateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema)]),
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional()
}).strict();
export const StaffingRoleUpsertWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpsertWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpsertWithoutCandidatesInput>;
export const StaffingRoleUpsertWithoutCandidatesInputObjectZodSchema = makeSchema();
