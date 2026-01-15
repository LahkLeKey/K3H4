import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCreateWithoutCandidatesInputObjectSchema as StaffingRoleCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleCreateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema)])
}).strict();
export const StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutCandidatesInput>;
export const StaffingRoleCreateOrConnectWithoutCandidatesInputObjectZodSchema = makeSchema();
