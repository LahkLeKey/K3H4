import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleCreateWithoutUserInputObjectSchema as StaffingRoleCreateWithoutUserInputObjectSchema } from './StaffingRoleCreateWithoutUserInput.schema';
import { StaffingRoleUncheckedCreateWithoutUserInputObjectSchema as StaffingRoleUncheckedCreateWithoutUserInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingRoleCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleCreateOrConnectWithoutUserInput>;
export const StaffingRoleCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
