import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateWithoutUserInputObjectSchema as StaffingRoleUpdateWithoutUserInputObjectSchema } from './StaffingRoleUpdateWithoutUserInput.schema';
import { StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema as StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutUserInput.schema';
import { StaffingRoleCreateWithoutUserInputObjectSchema as StaffingRoleCreateWithoutUserInputObjectSchema } from './StaffingRoleCreateWithoutUserInput.schema';
import { StaffingRoleUncheckedCreateWithoutUserInputObjectSchema as StaffingRoleUncheckedCreateWithoutUserInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => StaffingRoleUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingRoleUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpsertWithWhereUniqueWithoutUserInput>;
export const StaffingRoleUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
