import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeCardsInputObjectSchema as UserCreateWithoutArcadeCardsInputObjectSchema } from './UserCreateWithoutArcadeCardsInput.schema';
import { UserUncheckedCreateWithoutArcadeCardsInputObjectSchema as UserUncheckedCreateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeCardsInput.schema';
import { UserCreateOrConnectWithoutArcadeCardsInputObjectSchema as UserCreateOrConnectWithoutArcadeCardsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeCardsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeCardsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeCardsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutArcadeCardsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeCardsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeCardsInput>;
export const UserCreateNestedOneWithoutArcadeCardsInputObjectZodSchema = makeSchema();
