import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './objects/AgricultureInventoryMovementInclude.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryMovementWhereUniqueInput.schema';

export const AgricultureInventoryMovementFindUniqueSchema: z.ZodType<Prisma.AgricultureInventoryMovementFindUniqueArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementFindUniqueArgs>;

export const AgricultureInventoryMovementFindUniqueZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict();