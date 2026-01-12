import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementWhereInputObjectSchema as AgricultureInventoryMovementWhereInputObjectSchema } from './objects/AgricultureInventoryMovementWhereInput.schema';

export const AgricultureInventoryMovementDeleteManySchema: z.ZodType<Prisma.AgricultureInventoryMovementDeleteManyArgs> = z.object({ where: AgricultureInventoryMovementWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementDeleteManyArgs>;

export const AgricultureInventoryMovementDeleteManyZodSchema = z.object({ where: AgricultureInventoryMovementWhereInputObjectSchema.optional() }).strict();