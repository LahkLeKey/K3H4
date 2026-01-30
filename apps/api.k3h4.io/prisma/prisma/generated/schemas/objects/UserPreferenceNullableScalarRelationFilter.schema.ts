import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceWhereInputObjectSchema as UserPreferenceWhereInputObjectSchema } from './UserPreferenceWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => UserPreferenceWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => UserPreferenceWhereInputObjectSchema).optional().nullable()
}).strict();
export const UserPreferenceNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.UserPreferenceNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceNullableScalarRelationFilter>;
export const UserPreferenceNullableScalarRelationFilterObjectZodSchema = makeSchema();
