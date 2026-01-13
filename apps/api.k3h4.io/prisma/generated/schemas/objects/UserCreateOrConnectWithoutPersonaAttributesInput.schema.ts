import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPersonaAttributesInputObjectSchema as UserCreateWithoutPersonaAttributesInputObjectSchema } from './UserCreateWithoutPersonaAttributesInput.schema';
import { UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema as UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaAttributesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPersonaAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPersonaAttributesInput>;
export const UserCreateOrConnectWithoutPersonaAttributesInputObjectZodSchema = makeSchema();
