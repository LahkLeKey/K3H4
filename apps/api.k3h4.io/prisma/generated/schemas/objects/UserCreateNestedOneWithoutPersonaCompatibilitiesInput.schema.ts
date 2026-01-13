import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateOrConnectWithoutPersonaCompatibilitiesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPersonaCompatibilitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPersonaCompatibilitiesInput>;
export const UserCreateNestedOneWithoutPersonaCompatibilitiesInputObjectZodSchema = makeSchema();
