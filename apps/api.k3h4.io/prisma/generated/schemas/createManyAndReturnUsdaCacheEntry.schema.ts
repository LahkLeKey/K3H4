import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './objects/UsdaCacheEntrySelect.schema';
import { UsdaCacheEntryCreateManyInputObjectSchema as UsdaCacheEntryCreateManyInputObjectSchema } from './objects/UsdaCacheEntryCreateManyInput.schema';

export const UsdaCacheEntryCreateManyAndReturnSchema: z.ZodType<Prisma.UsdaCacheEntryCreateManyAndReturnArgs> = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(), data: z.union([ UsdaCacheEntryCreateManyInputObjectSchema, z.array(UsdaCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCacheEntryCreateManyAndReturnArgs>;

export const UsdaCacheEntryCreateManyAndReturnZodSchema = z.object({ select: UsdaCacheEntrySelectObjectSchema.optional(), data: z.union([ UsdaCacheEntryCreateManyInputObjectSchema, z.array(UsdaCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();