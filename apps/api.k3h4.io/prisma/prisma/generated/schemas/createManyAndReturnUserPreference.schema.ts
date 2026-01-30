import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UserPreferenceSelectObjectSchema as UserPreferenceSelectObjectSchema } from './objects/UserPreferenceSelect.schema';
import { UserPreferenceCreateManyInputObjectSchema as UserPreferenceCreateManyInputObjectSchema } from './objects/UserPreferenceCreateManyInput.schema';

export const UserPreferenceCreateManyAndReturnSchema: z.ZodType<Prisma.UserPreferenceCreateManyAndReturnArgs> = z.object({ select: UserPreferenceSelectObjectSchema.optional(), data: z.union([ UserPreferenceCreateManyInputObjectSchema, z.array(UserPreferenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UserPreferenceCreateManyAndReturnArgs>;

export const UserPreferenceCreateManyAndReturnZodSchema = z.object({ select: UserPreferenceSelectObjectSchema.optional(), data: z.union([ UserPreferenceCreateManyInputObjectSchema, z.array(UserPreferenceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();