import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutStaffingEngagementsInputObjectSchema as UserCreateWithoutStaffingEngagementsInputObjectSchema } from './UserCreateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingEngagementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingEngagementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutStaffingEngagementsInput>;
export const UserCreateOrConnectWithoutStaffingEngagementsInputObjectZodSchema = makeSchema();
