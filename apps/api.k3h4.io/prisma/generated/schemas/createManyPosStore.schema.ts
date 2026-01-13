import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosStoreCreateManyInputObjectSchema as PosStoreCreateManyInputObjectSchema } from './objects/PosStoreCreateManyInput.schema';

export const PosStoreCreateManySchema: z.ZodType<Prisma.PosStoreCreateManyArgs> = z.object({ data: z.union([ PosStoreCreateManyInputObjectSchema, z.array(PosStoreCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PosStoreCreateManyArgs>;

export const PosStoreCreateManyZodSchema = z.object({ data: z.union([ PosStoreCreateManyInputObjectSchema, z.array(PosStoreCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();