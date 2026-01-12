import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntryCreateManyInputObjectSchema as UsdaCacheEntryCreateManyInputObjectSchema } from './objects/UsdaCacheEntryCreateManyInput.schema';

export const UsdaCacheEntryCreateManySchema: z.ZodType<Prisma.UsdaCacheEntryCreateManyArgs> = z.object({ data: z.union([ UsdaCacheEntryCreateManyInputObjectSchema, z.array(UsdaCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryCreateManyArgs>;

export const UsdaCacheEntryCreateManyZodSchema = z.object({ data: z.union([ UsdaCacheEntryCreateManyInputObjectSchema, z.array(UsdaCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();