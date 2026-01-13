import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProviderGrantSelectObjectSchema as ProviderGrantSelectObjectSchema } from './objects/ProviderGrantSelect.schema';
import { ProviderGrantCreateManyInputObjectSchema as ProviderGrantCreateManyInputObjectSchema } from './objects/ProviderGrantCreateManyInput.schema';

export const ProviderGrantCreateManyAndReturnSchema: z.ZodType<Prisma.ProviderGrantCreateManyAndReturnArgs> = z.object({ select: ProviderGrantSelectObjectSchema.optional(), data: z.union([ ProviderGrantCreateManyInputObjectSchema, z.array(ProviderGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProviderGrantCreateManyAndReturnArgs>;

export const ProviderGrantCreateManyAndReturnZodSchema = z.object({ select: ProviderGrantSelectObjectSchema.optional(), data: z.union([ ProviderGrantCreateManyInputObjectSchema, z.array(ProviderGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();