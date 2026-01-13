import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPersonaAttributesInputObjectSchema as UserCreateWithoutPersonaAttributesInputObjectSchema } from './UserCreateWithoutPersonaAttributesInput.schema';
import { UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema as UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaAttributesInput.schema';
import { UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema as UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema } from './UserCreateOrConnectWithoutPersonaAttributesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPersonaAttributesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPersonaAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPersonaAttributesInput>;
export const UserCreateNestedOneWithoutPersonaAttributesInputObjectZodSchema = makeSchema();
