import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './objects/PosLineItemSelect.schema';
import { PosLineItemCreateManyInputObjectSchema as PosLineItemCreateManyInputObjectSchema } from './objects/PosLineItemCreateManyInput.schema';

export const PosLineItemCreateManyAndReturnSchema: z.ZodType<Prisma.PosLineItemCreateManyAndReturnArgs> = z.object({ select: PosLineItemSelectObjectSchema.optional(), data: z.union([ PosLineItemCreateManyInputObjectSchema, z.array(PosLineItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PosLineItemCreateManyAndReturnArgs>;

export const PosLineItemCreateManyAndReturnZodSchema = z.object({ select: PosLineItemSelectObjectSchema.optional(), data: z.union([ PosLineItemCreateManyInputObjectSchema, z.array(PosLineItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();