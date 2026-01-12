import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAssignmentsInputObjectSchema as UserCreateWithoutAssignmentsInputObjectSchema } from './UserCreateWithoutAssignmentsInput.schema';
import { UserUncheckedCreateWithoutAssignmentsInputObjectSchema as UserUncheckedCreateWithoutAssignmentsInputObjectSchema } from './UserUncheckedCreateWithoutAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAssignmentsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAssignmentsInput>;
export const UserCreateOrConnectWithoutAssignmentsInputObjectZodSchema = makeSchema();
