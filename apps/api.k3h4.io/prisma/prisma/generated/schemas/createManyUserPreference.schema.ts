import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceCreateManyInputObjectSchema as UserPreferenceCreateManyInputObjectSchema } from './objects/UserPreferenceCreateManyInput.schema';

export const UserPreferenceCreateManySchema: z.ZodType<Prisma.UserPreferenceCreateManyArgs> = z.object({ data: z.union([ UserPreferenceCreateManyInputObjectSchema, z.array(UserPreferenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceCreateManyArgs>;

export const UserPreferenceCreateManyZodSchema = z.object({ data: z.union([ UserPreferenceCreateManyInputObjectSchema, z.array(UserPreferenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();