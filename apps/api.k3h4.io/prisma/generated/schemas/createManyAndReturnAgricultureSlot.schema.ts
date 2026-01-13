import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotSelectObjectSchema as AgricultureSlotSelectObjectSchema } from './objects/AgricultureSlotSelect.schema';
import { AgricultureSlotCreateManyInputObjectSchema as AgricultureSlotCreateManyInputObjectSchema } from './objects/AgricultureSlotCreateManyInput.schema';

export const AgricultureSlotCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureSlotCreateManyAndReturnArgs> = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), data: z.union([ AgricultureSlotCreateManyInputObjectSchema, z.array(AgricultureSlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotCreateManyAndReturnArgs>;

export const AgricultureSlotCreateManyAndReturnZodSchema = z.object({ select: AgricultureSlotSelectObjectSchema.optional(), data: z.union([ AgricultureSlotCreateManyInputObjectSchema, z.array(AgricultureSlotCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();