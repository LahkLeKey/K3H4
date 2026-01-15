import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutStaffingCandidatesInputObjectSchema as UserUpdateWithoutStaffingCandidatesInputObjectSchema } from './UserUpdateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingCandidatesInput.schema';
import { UserCreateWithoutStaffingCandidatesInputObjectSchema as UserCreateWithoutStaffingCandidatesInputObjectSchema } from './UserCreateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingCandidatesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutStaffingCandidatesInput>;
export const UserUpsertWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
