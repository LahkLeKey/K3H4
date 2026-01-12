import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CulinaryPrepTaskSelectObjectSchema as CulinaryPrepTaskSelectObjectSchema } from './objects/CulinaryPrepTaskSelect.schema';
import { CulinaryPrepTaskCreateManyInputObjectSchema as CulinaryPrepTaskCreateManyInputObjectSchema } from './objects/CulinaryPrepTaskCreateManyInput.schema';

export const CulinaryPrepTaskCreateManyAndReturnSchema: z.ZodType<Prisma.CulinaryPrepTaskCreateManyAndReturnArgs> = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), data: z.union([ CulinaryPrepTaskCreateManyInputObjectSchema, z.array(CulinaryPrepTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCreateManyAndReturnArgs>;

export const CulinaryPrepTaskCreateManyAndReturnZodSchema = z.object({ select: CulinaryPrepTaskSelectObjectSchema.optional(), data: z.union([ CulinaryPrepTaskCreateManyInputObjectSchema, z.array(CulinaryPrepTaskCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();