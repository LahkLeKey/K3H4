import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PoiCreateManyInputObjectSchema as PoiCreateManyInputObjectSchema } from './objects/PoiCreateManyInput.schema';

export const PoiCreateManySchema: z.ZodType<Prisma.PoiCreateManyArgs> = z.object({ data: z.union([ PoiCreateManyInputObjectSchema, z.array(PoiCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PoiCreateManyArgs>;

export const PoiCreateManyZodSchema = z.object({ data: z.union([ PoiCreateManyInputObjectSchema, z.array(PoiCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();