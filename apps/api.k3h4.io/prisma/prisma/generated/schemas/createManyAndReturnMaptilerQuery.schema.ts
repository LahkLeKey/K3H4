import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQuerySelectObjectSchema as MaptilerQuerySelectObjectSchema } from './objects/MaptilerQuerySelect.schema';
import { MaptilerQueryCreateManyInputObjectSchema as MaptilerQueryCreateManyInputObjectSchema } from './objects/MaptilerQueryCreateManyInput.schema';

export const MaptilerQueryCreateManyAndReturnSchema: z.ZodType<Prisma.MaptilerQueryCreateManyAndReturnArgs> = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), data: z.union([ MaptilerQueryCreateManyInputObjectSchema, z.array(MaptilerQueryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryCreateManyAndReturnArgs>;

export const MaptilerQueryCreateManyAndReturnZodSchema = z.object({ select: MaptilerQuerySelectObjectSchema.optional(), data: z.union([ MaptilerQueryCreateManyInputObjectSchema, z.array(MaptilerQueryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();