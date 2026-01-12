import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './UserPreferenceWhereInput.schema';
import { UserPreferenceUpdateWithoutUserInputObjectSchema as UserPreferenceUpdateWithoutUserInputObjectSchema } from './UserPreferenceUpdateWithoutUserInput.schema';
import { UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema as UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserPreferenceWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserPreferenceUpdateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const UserPreferenceUpdateToOneWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.UserPreferenceUpdateToOneWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceUpdateToOneWithWhereWithoutUserInput>;
export const UserPreferenceUpdateToOneWithWhereWithoutUserInputObjectZodSchema = makeSchema();
