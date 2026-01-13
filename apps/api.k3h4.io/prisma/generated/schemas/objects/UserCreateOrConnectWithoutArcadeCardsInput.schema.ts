import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutArcadeCardsInputObjectSchema as UserCreateWithoutArcadeCardsInputObjectSchema } from './UserCreateWithoutArcadeCardsInput.schema';
import { UserUncheckedCreateWithoutArcadeCardsInputObjectSchema as UserUncheckedCreateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeCardsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeCardsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutArcadeCardsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeCardsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeCardsInput>;
export const UserCreateOrConnectWithoutArcadeCardsInputObjectZodSchema = makeSchema();
