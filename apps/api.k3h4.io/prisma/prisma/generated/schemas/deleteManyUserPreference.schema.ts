import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './objects/UserPreferenceWhereInput.schema';

export const UserPreferenceDeleteManySchema: z.ZodType<Prisma.UserPreferenceDeleteManyArgs> = z.object({ where: UserPreferenceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceDeleteManyArgs>;

export const UserPreferenceDeleteManyZodSchema = z.object({ where: UserPreferenceWhereInputObjectSchema.optional() }).strict();