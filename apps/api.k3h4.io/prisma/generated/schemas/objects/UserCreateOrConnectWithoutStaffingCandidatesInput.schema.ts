import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutStaffingCandidatesInputObjectSchema as UserCreateWithoutStaffingCandidatesInputObjectSchema } from './UserCreateWithoutStaffingCandidatesInput.schema';
import { UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema as UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema } from './UserUncheckedCreateWithoutStaffingCandidatesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingCandidatesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingCandidatesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutStaffingCandidatesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingCandidatesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingCandidatesInput>;
export const UserCreateOrConnectWithoutStaffingCandidatesInputObjectZodSchema = makeSchema();
