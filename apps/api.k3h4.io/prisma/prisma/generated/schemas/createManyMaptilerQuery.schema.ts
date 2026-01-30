import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQueryCreateManyInputObjectSchema as MaptilerQueryCreateManyInputObjectSchema } from './objects/MaptilerQueryCreateManyInput.schema';

export const MaptilerQueryCreateManySchema: z.ZodType<Prisma.MaptilerQueryCreateManyArgs> = z.object({ data: z.union([ MaptilerQueryCreateManyInputObjectSchema, z.array(MaptilerQueryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryCreateManyArgs>;

export const MaptilerQueryCreateManyZodSchema = z.object({ data: z.union([ MaptilerQueryCreateManyInputObjectSchema, z.array(MaptilerQueryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();