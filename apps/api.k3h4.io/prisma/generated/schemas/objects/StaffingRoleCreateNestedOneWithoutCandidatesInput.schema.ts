import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutCandidatesInputObjectSchema as StaffingRoleCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleCreateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutCandidatesInput.schema';
import { StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema as StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutCandidatesInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingRoleCreateNestedOneWithoutCandidatesInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateNestedOneWithoutCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateNestedOneWithoutCandidatesInput>;
export const StaffingRoleCreateNestedOneWithoutCandidatesInputObjectZodSchema = makeSchema();
