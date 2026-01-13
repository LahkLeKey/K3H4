import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './objects/UserPreferenceInclude.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './objects/UserPreferenceWhereUniqueInput.schema';

export const UserPreferenceDeleteOneSchema: z.ZodType<Prisma.UserPreferenceDeleteArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), where: UserPreferenceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserPreferenceDeleteArgs>;

export const UserPreferenceDeleteOneZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), where: UserPreferenceWhereUniqueInputObjectSchema }).strict();