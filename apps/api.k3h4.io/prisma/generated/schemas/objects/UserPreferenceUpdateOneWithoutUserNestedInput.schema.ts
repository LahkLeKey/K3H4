import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceCreateWithoutUserInputObjectSchema as UserPreferenceCreateWithoutUserInputObjectSchema } from './UserPreferenceCreateWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateWithoutUserInput.schema';
import { UserPreferenceCreateOrConnectWithoutUserInputObjectSchema as UserPreferenceCreateOrConnectWithoutUserInputObjectSchema } from './UserPreferenceCreateOrConnectWithoutUserInput.schema';
import { UserPreferenceUpsertWithoutUserInputObjectSchema as UserPreferenceUpsertWithoutUserInputObjectSchema } from './UserPreferenceUpsertWithoutUserInput.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './UserPreferenceWhereInput.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './UserPreferenceWhereUniqueInput.schema';
import { UserPreferenceUpdateToOneWithWhereWithoutUserInputObjectSchema as UserPreferenceUpdateToOneWithWhereWithoutUserInputObjectSchema } from './UserPreferenceUpdateToOneWithWhereWithoutUserInput.schema';
import { UserPreferenceUpdateWithoutUserInputObjectSchema as UserPreferenceUpdateWithoutUserInputObjectSchema } from './UserPreferenceUpdateWithoutUserInput.schema';
import { UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema as UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserPreferenceCreateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserPreferenceCreateOrConnectWithoutUserInputObjectSchema).optional(),
  upsert: z.lazy(() => UserPreferenceUpsertWithoutUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserPreferenceWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserPreferenceWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserPreferenceWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserPreferenceUpdateToOneWithWhereWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUpdateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema)]).optional()
}).strict();
export const UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.UserPreferenceUpdateOneWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceUpdateOneWithoutUserNestedInput>;
export const UserPreferenceUpdateOneWithoutUserNestedInputObjectZodSchema = makeSchema();
