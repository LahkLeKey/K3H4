import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutStaffingEngagementsInputObjectSchema as UserCreateWithoutStaffingEngagementsInputObjectSchema } from './UserCreateWithoutStaffingEngagementsInput.schema';
import { UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema as UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema } from './UserUncheckedCreateWithoutStaffingEngagementsInput.schema';
import { UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema as UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema } from './UserCreateOrConnectWithoutStaffingEngagementsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutStaffingEngagementsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutStaffingEngagementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStaffingEngagementsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutStaffingEngagementsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingEngagementsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutStaffingEngagementsInput>;
export const UserCreateNestedOneWithoutStaffingEngagementsInputObjectZodSchema = makeSchema();
