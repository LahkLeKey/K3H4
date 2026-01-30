import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './objects/UserPreferenceInclude.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './objects/UserPreferenceWhereUniqueInput.schema';

export const UserPreferenceFindUniqueSchema: z.ZodType<Prisma.UserPreferenceFindUniqueArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), where: UserPreferenceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserPreferenceFindUniqueArgs>;

export const UserPreferenceFindUniqueZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), where: UserPreferenceWhereUniqueInputObjectSchema }).strict();