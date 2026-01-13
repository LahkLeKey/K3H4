import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './objects/CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemCreateManyInputObjectSchema as CulinaryMenuItemCreateManyInputObjectSchema } from './objects/CulinaryMenuItemCreateManyInput.schema';

export const CulinaryMenuItemCreateManyAndReturnSchema: z.ZodType<Prisma.CulinaryMenuItemCreateManyAndReturnArgs> = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), data: z.union([ CulinaryMenuItemCreateManyInputObjectSchema, z.array(CulinaryMenuItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryMenuItemCreateManyAndReturnArgs>;

export const CulinaryMenuItemCreateManyAndReturnZodSchema = z.object({ select: CulinaryMenuItemSelectObjectSchema.optional(), data: z.union([ CulinaryMenuItemCreateManyInputObjectSchema, z.array(CulinaryMenuItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();