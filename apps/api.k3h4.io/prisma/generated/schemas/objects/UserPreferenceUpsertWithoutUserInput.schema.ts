import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceUpdateWithoutUserInputObjectSchema as UserPreferenceUpdateWithoutUserInputObjectSchema } from './UserPreferenceUpdateWithoutUserInput.schema';
import { UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema as UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedUpdateWithoutUserInput.schema';
import { UserPreferenceCreateWithoutUserInputObjectSchema as UserPreferenceCreateWithoutUserInputObjectSchema } from './UserPreferenceCreateWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateWithoutUserInput.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './UserPreferenceWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserPreferenceUpdateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => UserPreferenceCreateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedCreateWithoutUserInputObjectSchema)]),
  where: z.lazy(() => UserPreferenceWhereInputObjectSchema).optional()
}).strict();
export const UserPreferenceUpsertWithoutUserInputObjectSchema: z.ZodType<Prisma.UserPreferenceUpsertWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceUpsertWithoutUserInput>;
export const UserPreferenceUpsertWithoutUserInputObjectZodSchema = makeSchema();
