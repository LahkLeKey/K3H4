import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaCompatibilitiesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPersonaCompatibilitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPersonaCompatibilitiesInput>;
export const UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectZodSchema = makeSchema();
