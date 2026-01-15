import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutStaffingEngagementsInputObjectSchema as UserUpdateWithoutStaffingEngagementsInputObjectSchema } from './UserUpdateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingEngagementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingEngagementsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutStaffingEngagementsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingEngagementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingEngagementsInput>;
export const UserUpdateToOneWithWhereWithoutStaffingEngagementsInputObjectZodSchema = makeSchema();
