import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementCreateManyInputObjectSchema as AgricultureInventoryMovementCreateManyInputObjectSchema } from './objects/AgricultureInventoryMovementCreateManyInput.schema';

export const AgricultureInventoryMovementCreateManySchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateManyArgs> = z.object({ data: z.union([ AgricultureInventoryMovementCreateManyInputObjectSchema, z.array(AgricultureInventoryMovementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateManyArgs>;

export const AgricultureInventoryMovementCreateManyZodSchema = z.object({ data: z.union([ AgricultureInventoryMovementCreateManyInputObjectSchema, z.array(AgricultureInventoryMovementCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();