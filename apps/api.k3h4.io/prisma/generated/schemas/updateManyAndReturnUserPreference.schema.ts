import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceUpdateManyMutationInputObjectSchema as UserPreferenceUpdateManyMutationInputObjectSchema } from './objects/UserPreferenceUpdateManyMutationInput.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './objects/UserPreferenceWhereInput.schema';

export const UserPreferenceUpdateManyAndReturnSchema: z.ZodType<Prisma.UserPreferenceUpdateManyAndReturnArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), data: UserPreferenceUpdateManyMutationInputObjectSchema, where: UserPreferenceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceUpdateManyAndReturnArgs>;

export const UserPreferenceUpdateManyAndReturnZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), data: UserPreferenceUpdateManyMutationInputObjectSchema, where: UserPreferenceWhereInputObjectSchema.optional() }).strict();