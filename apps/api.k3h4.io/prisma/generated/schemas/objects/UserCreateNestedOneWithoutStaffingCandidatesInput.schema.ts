import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingCandidatesInputObjectSchema as UserCreateWithoutStaffingCandidatesInputObjectSchema } from './UserCreateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingCandidatesInput.schema';
import { UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema as UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema } from './UserCreateOrConnectWithoutStaffingCandidatesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingCandidatesInput>;
export const UserCreateNestedOneWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
