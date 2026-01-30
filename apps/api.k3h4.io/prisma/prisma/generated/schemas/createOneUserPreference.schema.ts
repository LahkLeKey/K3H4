import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './objects/UserPreferenceInclude.schema';
import { UserPreferenceCreateInputObjectSchema as UserPreferenceCreateInputObjectSchema } from './objects/UserPreferenceCreateInput.schema';
import { UserPreferenceUncheckedCreateInputObjectSchema as UserPreferenceUncheckedCreateInputObjectSchema } from './objects/UserPreferenceUncheckedCreateInput.schema';

export const UserPreferenceCreateOneSchema: z.ZodType<Prisma.UserPreferenceCreateArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), data: z.union([UserPreferenceCreateInputObjectSchema, UserPreferenceUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UserPreferenceCreateArgs>;

export const UserPreferenceCreateOneZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), data: z.union([UserPreferenceCreateInputObjectSchema, UserPreferenceUncheckedCreateInputObjectSchema]) }).strict();