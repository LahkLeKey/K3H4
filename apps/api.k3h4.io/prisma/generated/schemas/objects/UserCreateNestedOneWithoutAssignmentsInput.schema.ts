import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAssignmentsInputObjectSchema as UserCreateWithoutAssignmentsInputObjectSchema } from './UserCreateWithoutAssignmentsInput.schema';
import { UserUncheckedCreateWithoutAssignmentsInputObjectSchema as UserUncheckedCreateWithoutAssignmentsInputObjectSchema } from './UserUncheckedCreateWithoutAssignmentsInput.schema';
import { UserCreateOrConnectWithoutAssignmentsInputObjectSchema as UserCreateOrConnectWithoutAssignmentsInputObjectSchema } from './UserCreateOrConnectWithoutAssignmentsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAssignmentsInput>;
export const UserCreateNestedOneWithoutAssignmentsInputObjectZodSchema = makeSchema();
