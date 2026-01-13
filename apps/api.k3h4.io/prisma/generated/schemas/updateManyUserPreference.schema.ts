import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceUpdateManyMutationInputObjectSchema as UserPreferenceUpdateManyMutationInputObjectSchema } from './objects/UserPreferenceUpdateManyMutationInput.schema';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './objects/UserPreferenceWhereInput.schema';

export const UserPreferenceUpdateManySchema: z.ZodType<Prisma.UserPreferenceUpdateManyArgs> = z.object({ data: UserPreferenceUpdateManyMutationInputObjectSchema, where: UserPreferenceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceUpdateManyArgs>;

export const UserPreferenceUpdateManyZodSchema = z.object({ data: UserPreferenceUpdateManyMutationInputObjectSchema, where: UserPreferenceWhereInputObjectSchema.optional() }).strict();