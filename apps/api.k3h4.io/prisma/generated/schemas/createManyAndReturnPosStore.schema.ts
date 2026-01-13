import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './objects/PosStoreSelect.schema';
import { PosStoreCreateManyInputObjectSchema as PosStoreCreateManyInputObjectSchema } from './objects/PosStoreCreateManyInput.schema';

export const PosStoreCreateManyAndReturnSchema: z.ZodType<Prisma.PosStoreCreateManyAndReturnArgs> = z.object({ select: PosStoreSelectObjectSchema.optional(), data: z.union([ PosStoreCreateManyInputObjectSchema, z.array(PosStoreCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreCreateManyAndReturnArgs>;

export const PosStoreCreateManyAndReturnZodSchema = z.object({ select: PosStoreSelectObjectSchema.optional(), data: z.union([ PosStoreCreateManyInputObjectSchema, z.array(PosStoreCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();