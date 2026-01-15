import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateWithoutUserInputObjectSchema as StaffingRoleUpdateWithoutUserInputObjectSchema } from './StaffingRoleUpdateWithoutUserInput.schema';
import { StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema as StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => StaffingRoleUpdateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingRoleUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateWithWhereUniqueWithoutUserInput>;
export const StaffingRoleUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
