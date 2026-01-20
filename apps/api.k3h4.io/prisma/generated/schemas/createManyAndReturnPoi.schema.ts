import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiSelectObjectSchema as PoiSelectObjectSchema } from './objects/PoiSelect.schema';
import { PoiCreateManyInputObjectSchema as PoiCreateManyInputObjectSchema } from './objects/PoiCreateManyInput.schema';

export const PoiCreateManyAndReturnSchema: z.ZodType<Prisma.PoiCreateManyAndReturnArgs> = z.object({ select: PoiSelectObjectSchema.optional(), data: z.union([ PoiCreateManyInputObjectSchema, z.array(PoiCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PoiCreateManyAndReturnArgs>;

export const PoiCreateManyAndReturnZodSchema = z.object({ select: PoiSelectObjectSchema.optional(), data: z.union([ PoiCreateManyInputObjectSchema, z.array(PoiCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();