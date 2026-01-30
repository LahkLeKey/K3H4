import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './objects/UserPreferenceInclude.schema';
import { UserPreferenceUpdateInputObjectSchema as UserPreferenceUpdateInputObjectSchema } from './objects/UserPreferenceUpdateInput.schema';
import { UserPreferenceUncheckedUpdateInputObjectSchema as UserPreferenceUncheckedUpdateInputObjectSchema } from './objects/UserPreferenceUncheckedUpdateInput.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './objects/UserPreferenceWhereUniqueInput.schema';

export const UserPreferenceUpdateOneSchema: z.ZodType<Prisma.UserPreferenceUpdateArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), data: z.union([UserPreferenceUpdateInputObjectSchema, UserPreferenceUncheckedUpdateInputObjectSchema]), where: UserPreferenceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserPreferenceUpdateArgs>;

export const UserPreferenceUpdateOneZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), data: z.union([UserPreferenceUpdateInputObjectSchema, UserPreferenceUncheckedUpdateInputObjectSchema]), where: UserPreferenceWhereUniqueInputObjectSchema }).strict();