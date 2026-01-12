import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './objects/AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './objects/AgricultureInventoryMovementInclude.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './objects/AgricultureInventoryMovementWhereUniqueInput.schema';

export const AgricultureInventoryMovementFindUniqueOrThrowSchema: z.ZodType<Prisma.AgricultureInventoryMovementFindUniqueOrThrowArgs> = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementFindUniqueOrThrowArgs>;

export const AgricultureInventoryMovementFindUniqueOrThrowZodSchema = z.object({ select: AgricultureInventoryMovementSelectObjectSchema.optional(), include: AgricultureInventoryMovementIncludeObjectSchema.optional(), where: AgricultureInventoryMovementWhereUniqueInputObjectSchema }).strict();