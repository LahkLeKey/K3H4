import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './objects/AgricultureInventoryMovementInclude.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryMovementWhereUniqueInput.schema';

export const AgricultureInventoryMovementDeleteOneSchema: z.ZodType<Prisma.AgricultureInventoryMovementDeleteArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementDeleteArgs>;

export const AgricultureInventoryMovementDeleteOneZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict();