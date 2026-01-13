import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutArcadeTopUpsInputObjectSchema as UserCreateWithoutArcadeTopUpsInputObjectSchema } from './UserCreateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeTopUpsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeTopUpsInput>;
export const UserCreateOrConnectWithoutArcadeTopUpsInputObjectZodSchema = makeSchema();
