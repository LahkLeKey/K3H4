import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantCreateManyInputObjectSchema as ProviderGrantCreateManyInputObjectSchema } from './objects/ProviderGrantCreateManyInput.schema';

export const ProviderGrantCreateManySchema: z.ZodType<Prisma.ProviderGrantCreateManyArgs> = z.object({ data: z.union([ ProviderGrantCreateManyInputObjectSchema, z.array(ProviderGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantCreateManyArgs>;

export const ProviderGrantCreateManyZodSchema = z.object({ data: z.union([ ProviderGrantCreateManyInputObjectSchema, z.array(ProviderGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();