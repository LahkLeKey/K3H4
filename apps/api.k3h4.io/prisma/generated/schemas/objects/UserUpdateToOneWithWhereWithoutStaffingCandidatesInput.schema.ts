import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutStaffingCandidatesInputObjectSchema as UserUpdateWithoutStaffingCandidatesInputObjectSchema } from './UserUpdateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutStaffingCandidatesInput>;
export const UserUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
