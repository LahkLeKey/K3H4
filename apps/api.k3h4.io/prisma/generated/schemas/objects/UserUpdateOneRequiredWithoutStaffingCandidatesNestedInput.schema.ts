import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingCandidatesInputObjectSchema as UserCreateWithoutStaffingCandidatesInputObjectSchema } from './UserCreateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingCandidatesInput.schema';
import { UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema as UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema } from './UserCreateOrConnectWithoutStaffingCandidatesInput.schema';
import { UserUpsertWithoutStaffingCandidatesInputObjectSchema as UserUpsertWithoutStaffingCandidatesInputObjectSchema } from './UserUpsertWithoutStaffingCandidatesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema as UserUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutStaffingCandidatesInput.schema';
import { UserUpdateWithoutStaffingCandidatesInputObjectSchema as UserUpdateWithoutStaffingCandidatesInputObjectSchema } from './UserUpdateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedUpdateWithoutStaffingCandidatesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStaffingCandidatesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUpdateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutStaffingCandidatesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutStaffingCandidatesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingCandidatesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutStaffingCandidatesNestedInput>;
export const UserUpdateOneRequiredWithoutStaffingCandidatesNestedInputObjectZodSchema = makeSchema();
