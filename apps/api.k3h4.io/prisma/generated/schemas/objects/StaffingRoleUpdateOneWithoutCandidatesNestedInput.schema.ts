import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutCandidatesInputObjectSchema as StaffingRoleCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleCreateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutCandidatesInput.schema';
import { StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema as StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutCandidatesInput.schema';
import { StaffingRoleUpsertWithoutCandidatesInputObjectSchema as StaffingRoleUpsertWithoutCandidatesInputObjectSchema } from './StaffingRoleUpsertWithoutCandidatesInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateToOneWithWhereWithoutCandidatesInputObjectSchema as StaffingRoleUpdateToOneWithWhereWithoutCandidatesInputObjectSchema } from './StaffingRoleUpdateToOneWithWhereWithoutCandidatesInput.schema';
import { StaffingRoleUpdateWithoutCandidatesInputObjectSchema as StaffingRoleUpdateWithoutCandidatesInputObjectSchema } from './StaffingRoleUpdateWithoutCandidatesInput.schema';
import { StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema as StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutCandidatesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingRoleCreateOrConnectWithoutCandidatesInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingRoleUpsertWithoutCandidatesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingRoleUpdateToOneWithWhereWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUpdateWithoutCandidatesInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutCandidatesInputObjectSchema)]).optional()
}).strict();
export const StaffingRoleUpdateOneWithoutCandidatesNestedInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateOneWithoutCandidatesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateOneWithoutCandidatesNestedInput>;
export const StaffingRoleUpdateOneWithoutCandidatesNestedInputObjectZodSchema = makeSchema();
