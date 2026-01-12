import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeTopUpsInputObjectSchema as UserCreateWithoutArcadeTopUpsInputObjectSchema } from './UserCreateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeTopUpsInput.schema';
import { UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema as UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeTopUpsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutArcadeTopUpsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeTopUpsInput>;
export const UserCreateNestedOneWithoutArcadeTopUpsInputObjectZodSchema = makeSchema();
