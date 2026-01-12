import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementCreateManyInputObjectSchema as AgricultureInventoryMovementCreateManyInputObjectSchema } from './objects/AgricultureInventoryMovementCreateManyInput.schema';

export const AgricultureInventoryMovementCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateManyAndReturnArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), data: z.union([ AgricultureInventoryMovementCreateManyInputObjectSchema, z.array(AgricultureInventoryMovementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateManyAndReturnArgs>;

export const AgricultureInventoryMovementCreateManyAndReturnZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), data: z.union([ AgricultureInventoryMovementCreateManyInputObjectSchema, z.array(AgricultureInventoryMovementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();