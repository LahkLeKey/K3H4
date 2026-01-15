import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingRoleUpdateWithoutCandidatesInputObjectSchema as StaffingRoleUpdateWithoutCandidatesInputObjectSchema } from './StaffingRoleUpdateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingRoleUpdateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateToOneWithWhereWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateToOneWithWhereWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateToOneWithWhereWithoutCandidatesInput>;
export const StaffingRoleUpdateToOneWithWhereWithoutCandidatesInputObjectZodSchema = makeSchema();
