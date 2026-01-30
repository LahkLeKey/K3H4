import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RefreshTokenCreateManyInputObjectSchema as RefreshTokenCreateManyInputObjectSchema } from './objects/RefreshTokenCreateManyInput.schema';

export const RefreshTokenCreateManySchema: z.ZodType<Prisma.RefreshTokenCreateManyArgs> = z.object({ data: z.union([ RefreshTokenCreateManyInputObjectSchema, z.array(RefreshTokenCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RefreshTokenCreateManyArgs>;

export const RefreshTokenCreateManyZodSchema = z.object({ data: z.union([ RefreshTokenCreateManyInputObjectSchema, z.array(RefreshTokenCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();