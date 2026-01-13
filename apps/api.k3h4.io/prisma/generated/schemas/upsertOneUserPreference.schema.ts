import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceIncludeObjectSchema as UserPreferenceIncludeObjectSchema } from './objects/UserPreferenceInclude.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './objects/UserPreferenceWhereUniqueInput.schema';
import { UserPreferenceCreateInputObjectSchema as UserPreferenceCreateInputObjectSchema } from './objects/UserPreferenceCreateInput.schema';
import { UserPreferenceUncheckedCreateInputObjectSchema as UserPreferenceUncheckedCreateInputObjectSchema } from './objects/UserPreferenceUncheckedCreateInput.schema';
import { UserPreferenceUpdateInputObjectSchema as UserPreferenceUpdateInputObjectSchema } from './objects/UserPreferenceUpdateInput.schema';
import { UserPreferenceUncheckedUpdateInputObjectSchema as UserPreferenceUncheckedUpdateInputObjectSchema } from './objects/UserPreferenceUncheckedUpdateInput.schema';

export const UserPreferenceUpsertOneSchema: z.ZodType<Prisma.UserPreferenceUpsertArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), where: UserPreferenceWhereUniqueInputObjectSchema, create: z.union([ UserPreferenceCreateInputObjectSchema, UserPreferenceUncheckedCreateInputObjectSchema ]), update: z.union([ UserPreferenceUpdateInputObjectSchema, UserPreferenceUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UserPreferenceUpsertArgs>;

export const UserPreferenceUpsertOneZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), include: UserPreferenceIncludeObjectSchema.optional(), where: UserPreferenceWhereUniqueInputObjectSchema, create: z.union([ UserPreferenceCreateInputObjectSchema, UserPreferenceUncheckedCreateInputObjectSchema ]), update: z.union([ UserPreferenceUpdateInputObjectSchema, UserPreferenceUncheckedUpdateInputObjectSchema ]) }).strict();